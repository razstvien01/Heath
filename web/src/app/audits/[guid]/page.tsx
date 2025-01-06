import AuditCrud from "@/components/pages/auditCrud";
import { notFound } from "next/navigation";

async function isAdminGuid(guid : string) {
  const isAdminGuidUrl = process.env.BASE_URL + "/api/owner/isOwnerGuid";

  const formData = new FormData();
  formData.append("guid", guid);

  const res = await fetch(isAdminGuidUrl, {
    method: "POST",
    body: formData
  });

  if(res.ok) {
    return true;
  } 
  return false;
}

export default async function AuditManagementPage({ params } : { params: { guid : string } }) {
  const { guid } = await params;

  const isAdminGuidRes = await isAdminGuid(guid);
    if(!isAdminGuidRes) {
        notFound();
    }

  return (
    <div>
       <AuditCrud guid={guid} />
    </div>
  )
};
