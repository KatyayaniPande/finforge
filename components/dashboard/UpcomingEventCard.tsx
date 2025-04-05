import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";

interface UpcomingEventCardProps {
  title: string;
  date: Date;
  type: string;
  description: string;
}

export function UpcomingEventCard({
  title,
  date,
  type,
  description,
}: UpcomingEventCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-xs text-muted-foreground">{type}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <div className="flex items-center mb-2">
            <span className="font-medium mr-2">Date:</span>
            {format(date, "MMM d, yyyy")}
          </div>
          <div className="flex items-center mb-2">
            <span className="font-medium mr-2">Time:</span>
            {format(date, "h:mm a")}
          </div>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
} 