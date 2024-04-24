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
import DeleteIcon from "@mui/icons-material/Delete";
import { AdsTableHeader, AdsType, SubCampaign } from "../../../../types/types";
import { AdsField, AdsTableHeaderCells } from "../../../../constants/constants";

interface IAdsTableProps {
  subCampaignSelected: number;
  setSubCampaigns: (data: SubCampaign[]) => void;
  subCampaigns: SubCampaign[];
  isSubmit: boolean;
}

const AdsTable: React.FC<IAdsTableProps> = ({
  subCampaigns,
  setSubCampaigns,
  subCampaignSelected,
  isSubmit,
}: Readonly<IAdsTableProps>) => {
  const [adsSelected, setAdsSelected] = React.useState<string[]>([]);
  const adsData = subCampaigns[subCampaignSelected].ads || [];

  const addAds = () => {
    const updatedSubCampaigns = [...subCampaigns];
    const adsSubCampaign = updatedSubCampaigns[subCampaignSelected].ads;

    adsSubCampaign.push({
      name: `Quảng cáo ${adsSubCampaign.length + 1}`,
      quantity: 0,
      id: `sub${subCampaignSelected}_${adsSubCampaign.length}`,
    });

    setSubCampaigns([...updatedSubCampaigns]);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setAdsSelected(adsData.map((n: AdsType) => n.id));
      return;
    }
    setAdsSelected([]);
  };

  const handleSelectSingle = (
    event: React.ChangeEvent<HTMLInputElement>,
    adsId: string
  ) => {
    if (event.target.checked) {
      setAdsSelected([...adsSelected, adsId]);
    } else {
      setAdsSelected(adsSelected.filter((ads) => ads !== adsId));
    }
  };

  const handleChangeAdsInfo = (
    field: string,
    value: number | string,
    index: number
  ) => {
    const updatedSubCampaigns = [...subCampaigns];
    if (field === AdsField.NAME) {
      updatedSubCampaigns[subCampaignSelected].ads[index].name =
        value as string;
    } else {
      updatedSubCampaigns[subCampaignSelected].ads[index].quantity =
        Number(value);
    }

    setSubCampaigns([...updatedSubCampaigns]);
  };

  const deleteAds = (id: string) => {
    const updatedAds = [
      ...subCampaigns[subCampaignSelected].ads.filter(
        (item: AdsType) => item.id !== id
      ),
    ];

    const updatedSubCampaigns = [...subCampaigns];
    updatedSubCampaigns[subCampaignSelected].ads = updatedAds;
    setSubCampaigns([...updatedSubCampaigns]);
  };

  const deleteAllAds = () => {
    const updatedSubCampaigns = [...subCampaigns];
    updatedSubCampaigns[subCampaignSelected].ads = [];
    setSubCampaigns([...updatedSubCampaigns]);
    setAdsSelected([]);
  };

  const isAdsSelected = (id: string) => adsSelected.includes(id);

  return (
    <div className="wrapper">
      <Typography sx={{ padding: "16px", marginTop: "16px" }} variant="h6">
        DANH SÁCH QUẢNG CÁO
      </Typography>
      <TableContainer>
        <Table>
          <TableHead sx={{ height: "57px" }}>
            <TableRow sx={{ padding: 0 }}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    adsSelected.length > 0 &&
                    adsData.length > adsSelected.length
                  }
                  checked={adsData.length === adsSelected.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              {adsData.length !== adsSelected.length ||
              adsSelected.length === 0 ? (
                AdsTableHeaderCells.map((headCell: AdsTableHeader) => (
                  <TableCell
                    align={headCell.align}
                    key={headCell.id}
                    sx={{
                      width: "40%",
                      height: "57px",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    {headCell.type === "button" ? (
                      <Button
                        variant="outlined"
                        onClick={addAds}
                        sx={{ height: "40px", width: "100px" }}
                      >
                        + Thêm
                      </Button>
                    ) : (
                      <Typography variant="body1">{headCell.label}</Typography>
                    )}
                  </TableCell>
                ))
              ) : (
                <DeleteIcon
                  fontSize="medium"
                  color="action"
                  onClick={deleteAllAds}
                  sx={{
                    padding: "8px",
                    transform: "translateY(20%)",
                    cursor: "pointer",
                  }}
                />
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {adsData.map((row: AdsType, index: number) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={index}
                  selected={isAdsSelected(row.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      onChange={(e) => handleSelectSingle(e, row.id)}
                      color="primary"
                      checked={isAdsSelected(row.id)}
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
                        handleChangeAdsInfo(
                          AdsField.NAME,
                          e.target.value,
                          index
                        )
                      }
                      error={isSubmit && !row.name}
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
                        handleChangeAdsInfo(
                          AdsField.QUANTITY,
                          e.target.value,
                          index
                        )
                      }
                      error={isSubmit && !row.quantity}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <DeleteIcon
                      fontSize="small"
                      color="action"
                      onClick={() =>
                        adsSelected.length !== adsData.length &&
                        deleteAds(row.id)
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdsTable;
