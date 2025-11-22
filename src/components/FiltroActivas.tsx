import { FormControlLabel, FormGroup, Switch } from "@mui/material";

interface FiltroActivasProps {
  soloActivas: boolean;
  onSoloActivasChanged: (soloActivas: boolean) => void;
}

export const FiltroActivas = ({
  soloActivas,
  onSoloActivasChanged,
}: FiltroActivasProps) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={soloActivas}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onSoloActivasChanged(event.target.checked)
            }
            slotProps={{ input: { "aria-label": "controlled" } }}
          />
        }
        label="Solo Activos"
      />
    </FormGroup>
  );
};
