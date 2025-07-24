
'use client';

import { useRouter } from 'next/navigation';
import CampaignGenerator from './campaign-generator/page';

export default function DashboardPage() {
  const router = useRouter();
  
  return (
    <div>
      <CampaignGenerator />
    </div>
  );
}
