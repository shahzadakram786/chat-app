import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { Check, User, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
};

const Request = ({ id, imageUrl, username, email }: Props) => {

  // const {mutate: acceptRequest , pending: acceptPending} = useMutation
  // (api.request.accept)


  const {mutate: denyRequest , pending: denyPending} = useMutation
  (api.request.deny)

  return (
    <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
      <div className=" flex items-center gap-4 truncate">
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
        <Button size="icon" className="mr-2" disabled={
          denyPending
        } onClick={() => {}}>
          <Check />
        </Button>
        <Button size="icon" disabled={
          denyPending
        }  onClick={() => {
          denyRequest({id})
          .then(() => {
            toast.success("Friend Request Denied")
          })
          .catch((error) => {
            toast.error(
              error instanceof 
              ConvexError 
              ? error.data
              : "Unexpected error occurred"
            )
          })
        }}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default Request;
