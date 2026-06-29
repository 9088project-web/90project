import StatusBadge from "@/components/StatusBadge";
import { sampleInquiries } from "@/lib/meal-data";
export default function AdminInquiriesPage() { return <div><h1 className="mb-6 text-3xl font-black text-ink">顾客询问</h1><div className="table-wrap"><table className="admin-table"><thead><tr><th>编号</th><th>顾客</th><th>类型</th><th>地区</th><th>状态</th></tr></thead><tbody>{sampleInquiries.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.planType}</td><td>{item.area}</td><td><StatusBadge status={item.status} /></td></tr>)}</tbody></table></div></div>; }
