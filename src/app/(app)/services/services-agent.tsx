'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { AgentState, askAgent } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Loader2, Send, User } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Send />}
      <span className="sr-only">Send message</span>
    </Button>
  );
}

export function ServicesAgent() {
  const initialState: AgentState = {
    messages: [
      {
        role: 'assistant',
        content: "Hello! I'm the Campus Services agent. Ask me about the library, canteen, or gym.",
      },
    ],
  };

  const [state, formAction] = useActionState(askAgent, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!pending) {
      formRef.current?.reset();
    }
  }, [pending]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [state.messages]);

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Bot />
          Services Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {state.messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                    <AvatarFallback>
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {pending && (
              <div className="flex justify-start">
                 <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                    <AvatarFallback>
                      <Bot className="w-5 h-5"/>
                    </AvatarFallback>
                  </Avatar>
                <div className="rounded-lg px-4 py-2 max-w-[80%] bg-secondary flex items-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form action={formAction} ref={formRef} className="flex w-full gap-2">
          <Input name="query" placeholder="e.g., 'What's for lunch?'" required />
          <SubmitButton />
        </form>
      </CardFooter>
    </Card>
  );
}
