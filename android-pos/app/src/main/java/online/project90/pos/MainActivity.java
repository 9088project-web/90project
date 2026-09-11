package online.project90.pos;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class MainActivity extends Activity {
    private static final String APP_HOST = "www.90project.online";
    private static final String ROOT_HOST = "90project.online";
    private WebView webView;
    private WebView printWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        webView.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new PosWebViewClient());
        webView.addJavascriptInterface(new PosBridge(), "AndroidPosBridge");
        webView.loadUrl("https://www.90project.online/orders");
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
            return;
        }
        super.onBackPressed();
    }

    private class PosWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            Uri uri = request.getUrl();
            if (uri == null) return false;
            String scheme = uri.getScheme();
            if ("file".equalsIgnoreCase(scheme)) return false;
            String host = uri.getHost();
            if (APP_HOST.equalsIgnoreCase(host) || ROOT_HOST.equalsIgnoreCase(host)) return false;
            openExternal(uri);
            return true;
        }
    }

    private void openExternal(Uri uri) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
        } catch (ActivityNotFoundException error) {
            Toast.makeText(this, "手机没有可打开的应用。", Toast.LENGTH_LONG).show();
        }
    }

    private String normalizeWhatsAppPhone(String phone) {
        String digits = phone == null ? "" : phone.replaceAll("\\D", "");
        if (digits.isEmpty()) return "";
        if (digits.startsWith("60")) return digits;
        if (digits.startsWith("0")) return "60" + digits.substring(1);
        return digits;
    }

    private String encode(String value) {
        try {
            return URLEncoder.encode(value == null ? "" : value, "UTF-8").replace("+", "%20");
        } catch (UnsupportedEncodingException error) {
            return "";
        }
    }

    public class PosBridge {
        @JavascriptInterface
        public void openWhatsApp(String phone, String message) {
            runOnUiThread(() -> {
                String normalizedPhone = normalizeWhatsAppPhone(phone);
                if (normalizedPhone.isEmpty()) {
                    Toast.makeText(MainActivity.this, "顾客 WhatsApp 号码不正确。", Toast.LENGTH_LONG).show();
                    return;
                }
                Uri uri = Uri.parse("https://wa.me/" + normalizedPhone + "?text=" + encode(message));
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                intent.setPackage("com.whatsapp");
                try {
                    startActivity(intent);
                } catch (ActivityNotFoundException error) {
                    openExternal(uri);
                }
            });
        }

        @JavascriptInterface
        public void printReceipt(String html) {
            runOnUiThread(() -> {
                printWebView = new WebView(MainActivity.this);
                printWebView.getSettings().setJavaScriptEnabled(false);
                printWebView.setWebViewClient(new WebViewClient() {
                    @Override
                    public void onPageFinished(WebView view, String url) {
                        PrintManager printManager = (PrintManager) getSystemService(Context.PRINT_SERVICE);
                        if (printManager == null) {
                            Toast.makeText(MainActivity.this, "这台手机暂时不能打印。", Toast.LENGTH_LONG).show();
                            return;
                        }
                        PrintDocumentAdapter adapter = view.createPrintDocumentAdapter("90 PROJECT POS");
                        PrintAttributes attributes = new PrintAttributes.Builder()
                                .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                                .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
                                .build();
                        printManager.print("90 PROJECT POS", adapter, attributes);
                    }
                });
                printWebView.loadDataWithBaseURL("file:///android_asset/", html, "text/html", "UTF-8", null);
            });
        }

        @JavascriptInterface
        public void toast(String message) {
            runOnUiThread(() -> Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show());
        }
    }
}
