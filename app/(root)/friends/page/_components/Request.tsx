import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { Check, User, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
};

const Request = ({ id, imageUrl, username, email }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  // These are the mutation functions directly
  const acceptRequest = useMutation(api.request.accept);
  const denyRequest = useMutation(api.request.deny);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await acceptRequest({ id });
      toast.success("Friend Request Accepted");
    } catch (error: unknown) {
      toast.error(
        error instanceof ConvexError 
          ? error.data
          : "Unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeny = async () => {
    setIsLoading(true);
    try {
      await denyRequest({ id });
      toast.success("Friend Request Denied");
    } catch (error: unknown) {
      toast.error(
        error instanceof ConvexError 
          ? error.data
          : "Unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className="truncate">{username}</h4>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </div>
      </div>
      <div>
        {/* Accept / Decline Buttons */}
        <Button 
          size="icon" 
          className="mr-2" 
          disabled={isLoading}
          onClick={handleAccept}
        >
          <Check />
        </Button>
        <Button 
          size="icon" 
          disabled={isLoading}
          onClick={handleDeny}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default Request;