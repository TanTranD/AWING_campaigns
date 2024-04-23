import * as React from "react";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "./index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdsType } from "../../../../types/types";

interface HeadCell {
  id: string;
  label?: string;
  type?: string;
  align?: "right" | "left" | "center" | "inherit" | "justify" | undefined;
}

const headCells: readonly HeadCell[] = [
  {
    id: "ads_name",
    label: "Tên quảng cáo*",
  },
  {
    id: "ads_quantity",
    label: "Số lượng*",
  },
  {
    id: "tools",
    type: "button",
    align: "right",
  },
];

interface IAdsTableProps {
  subCampaignSelected: number;
  setSubCampaigns: any;
  subCampaigns: any;
}

function AdsTable({
  subCampaigns,
  setSubCampaigns,
  subCampaignSelected,
}: IAdsTableProps) {
  const [adsSelected, setAdsSelected] = React.useState<string[]>([]);
  const adsData = subCampaigns[subCampaignSelected].ads || [];
  console.log(adsData);

  const addAds = () => {
    const updatedSubCampaigns = [...subCampaigns];
    const adsSubCampaign = updatedSubCampaigns[subCampaignSelected].ads;

    adsSubCampaign.push({
      name: `Quảng cáo ${adsSubCampaign.length + 1}`,
      quantity: 0,
    });

    setSubCampaigns([...updatedSubCampaigns]);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setAdsSelected(adsData.map((n: AdsType) => n.name));
      return;
    }
    setAdsSelected([]);
  };

  const handleSelectSingle = (
    event: React.ChangeEvent<HTMLInputElement>,
    adsName: string
  ) => {
    if (event.target.checked) {
      setAdsSelected([...adsSelected, adsName]);
    } else {
      setAdsSelected(adsSelected.filter((ads) => ads !== adsName));
    }
  };

  const handleChangeAdsName = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedSubCampaigns = [...subCampaigns];
    updatedSubCampaigns[subCampaignSelected].ads[index].name =
      event.target.value;

    setSubCampaigns([...updatedSubCampaigns]);
  };

  const handleChangeAdsQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedSubCampaigns = [...subCampaigns];
    updatedSubCampaigns[subCampaignSelected].ads[index].quantity = Number(
      event.target.value
    );

    setSubCampaigns([...updatedSubCampaigns]);
  };

  const isAdsSelected = (name: string) => adsSelected.includes(name);

  return (
    <div className="wrapper">
      <Typography sx={{ padding: "16px", marginTop: "16px" }} variant="h6">
        DANH SÁCH QUẢNG CÁO
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    adsSelected.length > 0 &&
                    adsData.length > adsSelected.length
                  }
                  checked={adsData.length === adsSelected.length}
                  onChange={handleSelectAll}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
              {headCells.map((headCell: HeadCell) => (
                <TableCell
                  align={headCell.align}
                  key={headCell.id}
                  sx={{ width: "40%" }}
                >
                  {" "}
                  {headCell.type === "button" ? (
                    <Button variant="outlined" onClick={addAds}>
                      + Thêm
                    </Button>
                  ) : (
                    <Typography variant="body1">{headCell.label}</Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {adsData.map((row: AdsType, index: number) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  selected={isAdsSelected(row.name)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      onChange={(e) => handleSelectSingle(e, row.name)}
                      color="primary"
                      checked={isAdsSelected(row.name)}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{ padding: "8px 16px" }}
                  >
                    <TextField
                      fullWidth
                      required
                      variant="standard"
                      value={row.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeAdsName(e, index)
                      }
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    width="50%"
                    sx={{ padding: "8px 16px" }}
                  >
                    <TextField
                      fullWidth
                      required
                      variant="standard"
                      value={row.quantity}
                      type="number"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeAdsQuantity(e, index)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <DeleteIcon fontSize="small" color="action" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdsTable;
