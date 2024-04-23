import { FormControl } from "@mui/base/FormControl";
import { TextField } from "@mui/material";
import "./index.css";
import { useState } from "react";

interface IAdsInfomationProps {
  onSubmit: any;
}

function Infomation({ onSubmit }: IAdsInfomationProps) {
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = () => {
    // Gọi hàm onSubmit để chuyển dữ liệu lên component cha khi người dùng thay đổi trường nhập liệu
    onSubmit({ campaignName, description });
  };

  return (
    <div>
      <FormControl className="mg-8">
        <TextField
          fullWidth
          required
          label="Tên chiến dịch"
          variant="standard"
          onChange={(e) => {
            setCampaignName(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl className="mg-8">
        <TextField
          fullWidth
          label="Mô tả"
          variant="standard"
          onChange={(e) => {
            setDescription(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
    </div>
  );
}

export default Infomation;
