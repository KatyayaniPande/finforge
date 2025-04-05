'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";

const investments = [
  {
    id: 1,
    startup: "NeuralKey",
    sector: "AI/ML",
    amount: 500000,
    date: "2024-03-15",
    status: "Active",
    return: 25,
    documents: 3,
  },
  {
    id: 2,
    startup: "TechFlow",
    sector: "FinTech",
    amount: 300000,
    date: "2024-02-20",
    status: "Active",
    return: 18,
    documents: 2,
  },
  {
    id: 3,
    startup: "HealthBridge",
    sector: "HealthTech",
    amount: 400000,
    date: "2024-01-10",
    status: "Active",
    return: 22,
    documents: 4,
  },
  {
    id: 4,
    startup: "EduTech Pro",
    sector: "EdTech",
    amount: 250000,
    date: "2023-12-05",
    status: "Active",
    return: 15,
    documents: 2,
  },
];

export function InvestmentsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Startup</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Investment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Return</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell className="font-medium">{investment.startup}</TableCell>
              <TableCell>{investment.sector}</TableCell>
              <TableCell>${investment.amount.toLocaleString()}</TableCell>
              <TableCell>{new Date(investment.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {investment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-green-600">+{investment.return}%</TableCell>
              <TableCell>{investment.documents}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 