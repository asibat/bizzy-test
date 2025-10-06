import {
  TextField,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

export interface FieldType {
  name: string;
  label: string;
  type: string;
}

export interface FormDataType {
  type: string;
  name: string;
  description?: string;
  config: Record<string, any>;
  enabled: boolean;
}

export interface DiscountRuleFormFieldsProps {
  form: FormDataType;
  typeFields: FieldType[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => void;
  editingId: string | null;
}

const RULE_TYPE_OPTIONS = ["quantity", "vip", "weekend", "repeat"];

export default function DiscountRuleFormFields({
  form,
  typeFields,
  onChange,
  editingId,
}: DiscountRuleFormFieldsProps) {
  return (
    <>
      <Select
        name="type"
        value={form.type}
        onChange={onChange}
        fullWidth
        disabled={!!editingId}
        displayEmpty
        required
      >
        <MenuItem disabled value="">
          <em>Select type...</em>
        </MenuItem>
        {RULE_TYPE_OPTIONS.map((type) => (
          <MenuItem value={type} key={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={onChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={onChange}
        fullWidth
      />
      {typeFields.map((field) => (
        <TextField
          key={field.name}
          name={field.name}
          label={field.label}
          value={form.config[field.name] ?? ""}
          type={field.type}
          onChange={onChange}
          fullWidth
          required
        />
      ))}
    </>
  );
}
