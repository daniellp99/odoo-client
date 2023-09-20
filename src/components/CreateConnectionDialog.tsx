import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { PlusIcon } from "lucide-react";
import CreateConnectionForm from "./CreateConnectionForm";

export default function CreateConnectionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto text-background h-8"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm mx-auto md:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Odoo Connection</DialogTitle>
          <DialogDescription>
            Test your connection before create it.
          </DialogDescription>
        </DialogHeader>
        {/* Form inputs */}
        <CreateConnectionForm />
      </DialogContent>
    </Dialog>
  );
}
