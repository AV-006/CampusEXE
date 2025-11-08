'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard, rewards } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Trophy, Gift } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const getRankBadge = (rank: number) => {
  if (rank === 1) {
    return (
      <Badge
        variant="default"
        className="bg-amber-400 hover:bg-amber-400 text-amber-900"
      >
        <Crown className="w-3.5 h-3.5 mr-1" />
        {rank}
      </Badge>
    );
  }
  if (rank === 2) {
    return (
      <Badge
        variant="default"
        className="bg-slate-400 hover:bg-slate-400 text-slate-900"
      >
        {rank}
      </Badge>
    );
  }
  if (rank === 3) {
    return (
      <Badge
        variant="default"
        className="bg-orange-400 hover:bg-orange-400 text-orange-900"
      >
        {rank}
      </Badge>
    );
  }
  if (rank <= 5) {
    return (
      <Badge variant="secondary">
        <Star className="w-3.5 h-3.5 mr-1" />
        {rank}
      </Badge>
    );
  }
  return <span className="text-sm text-center w-6">{rank}</span>;
};

export default function InteractionPage() {
  const { toast } = useToast();
  const currentUserPoints = 950; // Mock current user points

  const handleRedeem = (points: number, description: string) => {
    toast({
      title: 'Reward Redemption',
      description: `You have redeemed ${points} points for "${description}". Enjoy! (This is a simulation)`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Class Interaction
        </h1>
        <p className="text-muted-foreground">
          Earn points for participation and climb the leaderboard!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Star className="text-primary" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((student) => (
                  <TableRow key={student.rank}>
                    <TableCell className="font-medium">
                      {getRankBadge(student.rank)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {student.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Trophy className="text-primary" />
              Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-secondary rounded-lg">
              <p className="font-semibold text-lg">Your Points</p>
              <p className="text-3xl font-bold text-primary">{currentUserPoints}</p>
            </div>
            <ul className="space-y-3">
              {rewards.map((reward) => (
                <li
                  key={reward.points}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-md"
                >
                  <div>
                    <p className="font-semibold">{reward.description}</p>
                    <p className="text-sm text-primary">{reward.points} Points</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleRedeem(reward.points, reward.description)}
                    disabled={currentUserPoints < reward.points}
                  >
                    <Gift className="mr-2 h-4 w-4" /> Redeem
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
