'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Mail, 
  Calendar, 
  Building2, 
  DollarSign,
  Clock,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

// Mock data for demonstration
const mockRequests = [
  {
    id: 1,
    investor: {
      name: 'John Smith',
      company: 'TechVentures',
      avatar: '/avatar-placeholder.png'
    },
    type: 'meeting',
    status: 'pending',
    message: 'Would like to discuss potential investment opportunities and learn more about your growth strategy.',
    date: '2024-03-15',
    time: '14:30',
    amount: 500000
  },
  {
    id: 2,
    investor: {
      name: 'Sarah Johnson',
      company: 'Growth Capital',
      avatar: '/avatar-placeholder.png'
    },
    type: 'message',
    status: 'pending',
    message: 'Interested in your Series A round. Could you share your latest pitch deck?',
    date: '2024-03-14',
    amount: 1000000
  },
  {
    id: 3,
    investor: {
      name: 'Michael Chen',
      company: 'Angel Investors Network',
      avatar: '/avatar-placeholder.png'
    },
    type: 'meeting',
    status: 'accepted',
    message: 'Impressed with your traction. Would like to discuss a potential angel investment.',
    date: '2024-03-16',
    time: '11:00',
    amount: 250000
  }
];

export default function RequestsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [requests, setRequests] = useState(mockRequests);

  if (!user || user.role !== 'startup') {
    router.push('/login');
    return null;
  }

  const handleAccept = (requestId: number) => {
    setRequests(requests.map(request => 
      request.id === requestId ? { ...request, status: 'accepted' } : request
    ));
  };

  const handleDecline = (requestId: number) => {
    setRequests(requests.map(request => 
      request.id === requestId ? { ...request, status: 'declined' } : request
    ));
  };

  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return request.status === 'pending';
    if (activeTab === 'accepted') return request.status === 'accepted';
    return true;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-singlife-primary">Investor Requests</h1>
        <p className="text-gray-600">Manage and respond to investor interest</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            All Requests
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Accepted
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={request.investor.avatar} />
                    <AvatarFallback>{request.investor.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{request.investor.name}</CardTitle>
                    <p className="text-sm text-gray-500">{request.investor.company}</p>
                  </div>
                </div>
                <Badge variant={request.status === 'pending' ? 'default' : 'secondary'}>
                  {request.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">{request.message}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>${request.amount.toLocaleString()}</span>
                    </div>
                    {request.type === 'meeting' && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{request.date} at {request.time}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="flex items-center gap-2 bg-singlife-primary hover:bg-singlife-primary/90"
                          onClick={() => handleAccept(request.id)}
                        >
                          <Check className="h-4 w-4" />
                          Accept
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={() => handleDecline(request.id)}
                        >
                          <X className="h-4 w-4" />
                          Decline
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={request.investor.avatar} />
                    <AvatarFallback>{request.investor.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{request.investor.name}</CardTitle>
                    <p className="text-sm text-gray-500">{request.investor.company}</p>
                  </div>
                </div>
                <Badge variant="default">Pending</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">{request.message}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>${request.amount.toLocaleString()}</span>
                    </div>
                    {request.type === 'meeting' && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{request.date} at {request.time}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex items-center gap-2 bg-singlife-primary hover:bg-singlife-primary/90"
                      onClick={() => handleAccept(request.id)}
                    >
                      <Check className="h-4 w-4" />
                      Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={() => handleDecline(request.id)}
                    >
                      <X className="h-4 w-4" />
                      Decline
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={request.investor.avatar} />
                    <AvatarFallback>{request.investor.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{request.investor.name}</CardTitle>
                    <p className="text-sm text-gray-500">{request.investor.company}</p>
                  </div>
                </div>
                <Badge variant="secondary">Accepted</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">{request.message}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>${request.amount.toLocaleString()}</span>
                    </div>
                    {request.type === 'meeting' && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{request.date} at {request.time}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
} 