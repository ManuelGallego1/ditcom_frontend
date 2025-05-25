import { Metadata } from 'next';
import PlanDetail from '@/modules/admin/planes/PlanDetail';
import { notFound } from 'next/navigation';
import { getPlanByIdServer } from '@/libs/plan-server-service';

interface PlanPageProps {
    params: { idPlan: string };
}

export async function generateStaticParams() {
    const staticPlanes = Array.from({ length: 30 }).map((_, i) => ({
        idPlan: `${i + 1}`,
    }));
    return staticPlanes;
}

export async function generateMetadata({
    params,
}: {
    params: { idPlan: string };
}): Promise<Metadata> {
    const { idPlan } = params;

    try {
        const planResponse = await getPlanByIdServer(idPlan);
        if (!planResponse?.data) throw new Error('Plan not found');

        const plan = planResponse.data;
        return {
            title: `#${plan.id} - ${plan.nombre}`,
            description: `Detalles del plan ${plan.nombre}`,
        };
    } catch {
        return {
            title: `#00 - No existente`,
            description: `Página del plan no existente`,
        };
    }
}

export default async function PlanPage({ params }: PlanPageProps) {
    const { idPlan } = params;
    let plan;

    try {
        const response = await getPlanByIdServer(idPlan);
        if (!response?.data) throw new Error('Plan not found');
        plan = response.data;
    } catch {
        return notFound();
    }

    return <PlanDetail idPlan={plan.id} />;
}