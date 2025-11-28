import { Card,CardContent } from "../ui/card";
interface StatCardProps  {
    label: string,
    value: string | number,
    icon?: React.ReactNode

}

export function StatCard({label,value,icon}: StatCardProps) {
    return (
        <Card className="transition-default hover:border-foreground/20">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div >
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="text-3xl font-semibold mt-2">{value}</p>
                    </div>
                {icon && (
                    <div className="text-muted-foreground">
                        {icon}
                    </div>
                )}
                </div>
            </CardContent>
        </Card>
    )

}