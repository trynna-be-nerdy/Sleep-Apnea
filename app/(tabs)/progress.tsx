 
import { Link } from 'expo-router';   
import { ArrowLeft, TrendingUp, Moon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ProgressPage = () => {
  // Mock data for the last 7 days
  const sleepData = [
    { date: 'Mon', efficiency: 72, bedtime: '23:15', wakeTime: '06:30', quality: 3 },
    { date: 'Tue', efficiency: 75, bedtime: '23:00', wakeTime: '06:30', quality: 3 },
    { date: 'Wed', efficiency: 68, bedtime: '23:30', wakeTime: '06:30', quality: 2 },
    { date: 'Thu', efficiency: 80, bedtime: '22:45', wakeTime: '06:30', quality: 4 },
    { date: 'Fri', efficiency: 78, bedtime: '23:00', wakeTime: '06:30', quality: 3 },
    { date: 'Sat', efficiency: 82, bedtime: '22:30', wakeTime: '06:30', quality: 4 },
    { date: 'Sun', efficiency: 85, bedtime: '22:30', wakeTime: '06:30', quality: 4 },
  ];

  const weeklyStats = {
    avgSleepEfficiency: 77,
    avgSleepOnsetLatency: 18, // minutes
    avgWakeAfterSleepOnset: 22, // minutes
    adherenceScore: 85,
  };

  const goals = [
    { name: 'Sleep Efficiency', current: 77, target: 85, unit: '%' },
    { name: 'Time to Fall Asleep', current: 18, target: 15, unit: 'min' },
    { name: 'Night Wakings', current: 22, target: 15, unit: 'min' },
    { name: 'Program Adherence', current: 85, target: 90, unit: '%' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" style={{ borderRadius: 9999, height: 40, width: 40, padding: 0 }}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Progress Report</h1>
            <p className="text-sm text-muted-foreground">Your sleep improvement journey</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Weekly Summary */}
        <Card className="sleep-card animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sleep-accent" />
              This Week's Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-sleep-accent">
                  {weeklyStats.avgSleepEfficiency}%
                </div>
                <p className="text-xs text-muted-foreground">Avg Sleep Efficiency</p>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-sleep-accent">
                  {weeklyStats.avgSleepOnsetLatency}m
                </div>
                <p className="text-xs text-muted-foreground">Avg Time to Sleep</p>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-sleep-accent">
                  {weeklyStats.avgWakeAfterSleepOnset}m
                </div>
                <p className="text-xs text-muted-foreground">Avg Night Waking</p>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-sleep-accent">
                  {weeklyStats.adherenceScore}%
                </div>
                <p className="text-xs text-muted-foreground">Program Adherence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sleep Efficiency Trend */}
        <Card className="sleep-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle>Sleep Efficiency Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[60, 90]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="hsl(var(--sleep-accent))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--sleep-accent))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Target: 85% sleep efficiency. You're making great progress! 📈
            </p>
          </CardContent>
        </Card>

        {/* Sleep Quality */}
        <Card className="sleep-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle>Sleep Quality This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, 5]}
                  />
                  <Bar 
                    dataKey="quality" 
                    fill="hsl(var(--sleep-accent))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1 - Poor</span>
              <span>5 - Excellent</span>
            </div>
          </CardContent>
        </Card>

        {/* Goals Progress */}
        <Card className="sleep-card animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-sleep-accent" />
              Goals Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((goal, index) => {
              const progress = goal.name === 'Time to Fall Asleep' || goal.name === 'Night Wakings' 
                ? ((goal.target / goal.current) * 100) // For metrics where lower is better
                : ((goal.current / goal.target) * 100); // For metrics where higher is better
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{goal.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.current}{goal.unit} / {goal.target}{goal.unit}
                    </span>
                  </div>
                  <Progress value={Math.min(progress, 100)} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Insights & Recommendations */}
        <Card className="sleep-card border-sleep-accent/30 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-sleep-accent" />
              This Week's Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-sleep-success mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Great Improvement!</p>
                  <p className="text-xs text-muted-foreground">
                    Your sleep efficiency improved by 13% this week. Weekend consistency was excellent.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-sleep-accent mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Bedtime Consistency</p>
                  <p className="text-xs text-muted-foreground">
                    You maintained your target bedtime 5/7 nights. Try setting a wind-down reminder.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-sleep-warning mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Wednesday Challenge</p>
                  <p className="text-xs text-muted-foreground">
                    Wednesday showed lower efficiency. Consider what happened that night and how to avoid it.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium text-foreground mb-2">Next Week's Focus</h4>
              <p className="text-xs text-muted-foreground">
                Continue with your current sleep window (22:30 - 06:30). 
                Add a 15-minute buffer to your wind-down routine to improve midweek consistency.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Export Report */}
        <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <Button variant="outline" style={{ borderRadius: 9999, height: 40, width: 40, padding: 0 }}>
              <ArrowLeft className="w-5 h-5" />
            Export Weekly Report
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;