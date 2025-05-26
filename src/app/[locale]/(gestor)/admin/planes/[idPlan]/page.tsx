import { Metadata } from 'next';
import PlanDetail from '@/src/modules/admin/planes/PlanDetail';
import { notFound } from 'next/navigation';
import { getPlanByIdServer } from '@/src/libs/plan-server-service';

interface PlanPageProps {
    params: Promise<{ idPlan: string }>;
}

export async function generateStaticParams() {
    const staticPlanes = Array.from({ length: 30 }).map((_, i) => ({
        idPlan: `${i + 1}`,
    }));
    return staticPlanes;
}

export async function generateMetadata(
    props: {
        params: Promise<{ idPlan: string }>;
    }
): Promise<Metadata> {
    const params = await props.params;
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

export default async function PlanPage(props: PlanPageProps) {
    const params = await props.params;
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