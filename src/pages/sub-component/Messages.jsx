import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllMessages,
  getAllMessage,
  resetAllMessage,
} from '@/features/slices/messageSlice';
import { toast } from 'react-toastify';
const Messages = () => {
  const { message, loading, error, messages } = useSelector(
    state => state.message
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(getAllMessage());
      
      // dispatch(resetAllMessage());
    }
  }, [message, dispatch, error, loading]);

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20 pr-2">
      <Card>
        <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center ">
          <CardTitle className="text-red-500">Message</CardTitle>
        </CardHeader>
        <CardContent>
          {messages && messages.length > 0
            ? messages.map(element => (
                <Card>
                  <CardDescription>
                    <span>sender name:</span>
                    {element.senderName}
                  </CardDescription>
                </Card>
              ))
            : 'not found'}
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
