import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  type SelectChangeEvent,
} from "@mui/material";
import DiscountRuleFormFields, {
  type FieldType,
  type FormDataType,
} from "./DiscountRuleFormFields";

export interface DiscountRuleDialogProps {
  open: boolean;
  onClose: () => void;
  form: FormDataType;
  typeFields: FieldType[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  editingId: string | null;
}

export default function DiscountRuleDialog({
  open,
  onClose,
  form,
  typeFields,
  onChange,
  onSubmit,
  editingId,
}: DiscountRuleDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle>
          {editingId ? "Edit Discount Rule" : "Create New Discount Rule"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DiscountRuleFormFields
              form={form}
              typeFields={typeFields}
              onChange={onChange}
              editingId={editingId}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
