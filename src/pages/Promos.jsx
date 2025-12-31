import React from 'react';
import MainLayout from '../layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { Gift, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const Promos = () => {
    const { userData } = useAuth();
    if (!userData) return null;
    const { promosData } = userData;

    return (
        <MainLayout title="Promotions">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {promosData.map((promo) => (
                    <div key={promo.id} className={cn("flex flex-col justify-between rounded-xl p-6 shadow-sm transition-transform hover:scale-[1.02]", promo.color)}>
                        <div>
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                                <Gift className={cn("h-6 w-6", promo.text)} />
                            </div>
                            <h3 className={cn("mb-2 text-lg font-bold", promo.text)}>{promo.title}</h3>
                            <p className="text-sm text-gray-600">{promo.description}</p>
                        </div>
                        <button className={cn("mt-6 flex items-center gap-2 text-sm font-bold hover:underline", promo.text)}>
                            Claim Offer <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default Promos;
