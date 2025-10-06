import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  IconButton,
  type SelectChangeEvent,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useDiscountRules } from "../context/DiscountRuleContext";
import type { DiscountRule } from "../types/DiscountRule";
import DiscountRuleDialog from "../components/DiscountRuleDialog";
import type {
  FieldType,
  FormDataType,
} from "../components/DiscountRuleFormFields";

const RULE_TYPE_FIELDS: Record<string, FieldType[]> = {
  quantity: [
    { name: "productId", label: "Product ID", type: "text" },
    { name: "minQty", label: "Min Quantity", type: "number" },
    { name: "percentOff", label: "Percent Off (%)", type: "number" },
  ],
  vip: [{ name: "percentOff", label: "Percent Off (%)", type: "number" }],
  weekend: [
    { name: "productId", label: "Product ID", type: "text" },
    { name: "minQty", label: "Min Quantity", type: "number" },
    { name: "percentOff", label: "Percent Off (%)", type: "number" },
  ],
  repeat: [
    { name: "productId", label: "Product ID", type: "text" },
    { name: "minQty", label: "Min Quantity", type: "number" },
    { name: "percentOff", label: "Percent Off (%)", type: "number" },
  ],
};

function prettyConfig(type: string, config: any): string {
  if (type === "quantity") {
    if (
      !config ||
      config.minQty == null ||
      !config.productId ||
      config.percentOff == null
    ) {
      return "—";
    }
    return `Buy ${config.minQty}+ of ${config.productId}, ${config.percentOff}% off`;
  }
  if (type === "vip") {
    if (!config || config.percentOff == null) {
      return "—";
    }
    return `${config.percentOff}% for VIP`;
  }
  return config ? JSON.stringify(config) : "—";
}

export default function DiscountRulesAdmin() {
  const {
    discountRules,
    createDiscountRule,
    updateDiscountRule,
    deleteDiscountRule,
  } = useDiscountRules();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormDataType>({
    type: "",
    name: "",
    description: "",
    config: {},
    enabled: true,
  });

  const typeFields =
    RULE_TYPE_FIELDS[form.type as keyof typeof RULE_TYPE_FIELDS] || [];

  const openDialog = (rule?: DiscountRule) => {
    if (rule) {
      setForm({
        type: rule.type,
        name: rule.name,
        description: rule.description,
        config: rule.config || {},
        enabled: rule.enabled,
      });
      setEditingId(rule.id);
    } else {
      setForm({
        type: "",
        name: "",
        description: "",
        config: {},
        enabled: true,
      });
      setEditingId(null);
    }
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value, type: fieldType } = e.target as HTMLInputElement;
    if (typeFields.some((f) => f.name === name)) {
      setForm((f) => ({
        ...f,
        config: {
          ...f.config,
          [name]: fieldType === "number" ? Number(value) : value,
        },
      }));
    } else {
      setForm((f) => ({ ...f, [name!]: value }));
    }
  };

  const submitRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type || !form.name) return;
    if (editingId) await updateDiscountRule(editingId, form);
    else await createDiscountRule(form);
    setOpen(false);
  };

  return (
    <Box maxWidth={1000} mx="auto" py={5}>
      <Box display="flex" alignItems="center" mb={4}>
        <Typography flex={1} variant="h4" fontWeight={700}>
          Discount Rules
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          sx={{ borderRadius: 2, fontWeight: 600, fontSize: 16 }}
          onClick={() => openDialog()}
        >
          New Rule
        </Button>
      </Box>
      <Grid container spacing={3}>
        {discountRules.map((rule) => (
          <Grid item xs={12} sm={6} md={4} key={rule.id}>
            <Card>
              <CardContent>
                <Box mb={1} display="flex" alignItems="center" gap={1}>
                  <Chip
                    label={rule.enabled ? "Enabled" : "Disabled"}
                    color={rule.enabled ? "success" : "default"}
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={rule.type.toUpperCase()}
                    color="info"
                    size="small"
                  />
                </Box>
                <Typography fontWeight={600} variant="h6">
                  {rule.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {rule.description}
                </Typography>
                <Typography
                  mt={1}
                  variant="body2"
                  fontFamily="monospace"
                  color="primary"
                >
                  {prettyConfig(rule.type, rule.config)}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={() => openDialog(rule)}>
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => deleteDiscountRule(rule.id)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {discountRules.length === 0 && (
          <Grid item xs={12}>
            <Box mt={6} textAlign="center" color="text.secondary">
              No discount rules exist yet.
            </Box>
          </Grid>
        )}
      </Grid>
      <DiscountRuleDialog
        open={open}
        onClose={closeDialog}
        form={form}
        typeFields={typeFields}
        onChange={handleChange}
        onSubmit={submitRule}
        editingId={editingId}
      />
    </Box>
  );
}
