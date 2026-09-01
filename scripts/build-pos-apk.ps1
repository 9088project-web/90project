$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Push-Location $root
try {
  node scripts/sync-pos-apk-assets.mjs

  $gradleCommand = Get-Command gradle.bat -ErrorAction SilentlyContinue
  if ($gradleCommand) {
    $gradle = $gradleCommand.Source
  } else {
    $gradleCandidates = Get-ChildItem "$env:USERPROFILE\.gradle\wrapper\dists" -Recurse -Filter gradle.bat -ErrorAction SilentlyContinue |
      Where-Object { $_.FullName -match "\\gradle-8\." } |
      Sort-Object FullName -Descending
    if (-not $gradleCandidates) {
      $gradleCandidates = Get-ChildItem "$env:USERPROFILE\.gradle\wrapper\dists" -Recurse -Filter gradle.bat -ErrorAction SilentlyContinue |
        Sort-Object FullName -Descending
    }
    if (-not $gradleCandidates) {
      throw "Gradle not found. Install Gradle or open the Android project once in Android Studio."
    }
    $gradle = $gradleCandidates[0].FullName
  }

  & $gradle -p android-pos --console=plain assembleRelease
  if ($LASTEXITCODE -ne 0) {
    throw "Gradle build failed with exit code $LASTEXITCODE"
  }

  $apkSource = Join-Path $root "android-pos\app\build\outputs\apk\release\app-release.apk"
  $apkOutputDir = Join-Path $root "output"
  $apkOutput = Join-Path $apkOutputDir "90project-pos.apk"
  New-Item -ItemType Directory -Force $apkOutputDir | Out-Null
  Copy-Item -LiteralPath $apkSource -Destination $apkOutput -Force
  Write-Host "APK ready: $apkOutput"
} finally {
  Pop-Location
}
