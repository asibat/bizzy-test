// pages/DiscountRulesAdmin.tsx

import React, { useState } from "react";
import { useDiscountRules } from "../context/DiscountRuleContext";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import type { DiscountRule } from "../types/DiscountRule";

export function DiscountRulesAdmin() {
  const { discountRules, loading, error, updateDiscountRule } =
    useDiscountRules();
  const [editId, setEditId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<DiscountRule>>({});
  const [saving, setSaving] = useState<boolean>(false);

  const handleEdit = (rule: DiscountRule) => {
    setEditId(rule.id);
    setEditValues(rule);
  };

  const handleChange = (field: string, value: string) => {
    setEditValues((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (editId) {
      setSaving(true);
      // Remove the id from the input sent to the mutation
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...input } = editValues;
      await updateDiscountRule(editId, input);
      setSaving(false);
    }
    setEditId(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditId(null);
    setEditValues({});
  };

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Discount Rules Admin
      </Typography>
      <Grid container spacing={2}>
        {discountRules.map((rule) => (
          <Grid item xs={12} sm={6} md={4} key={rule.id}>
            <Card>
              <CardContent>
                {editId === rule.id ? (
                  <>
                    <TextField
                      label="Name"
                      fullWidth
                      margin="dense"
                      value={editValues.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <TextField
                      label="Type"
                      fullWidth
                      margin="dense"
                      value={editValues.type}
                      onChange={(e) => handleChange("type", e.target.value)}
                    />
                    <TextField
                      label="Description"
                      fullWidth
                      margin="dense"
                      value={editValues.description ?? ""}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{rule.name}</Typography>
                    <Typography color="text.secondary">{rule.type}</Typography>
                    <Typography variant="body2">{rule.description}</Typography>
                  </>
                )}
              </CardContent>
              <CardActions>
                {editId === rule.id ? (
                  <>
                    <Button
                      color="primary"
                      onClick={handleSave}
                      variant="contained"
                      size="small"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save"}
                    </Button>
                    <Button onClick={handleCancel} size="small">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(rule)} size="small">
                      Edit
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
