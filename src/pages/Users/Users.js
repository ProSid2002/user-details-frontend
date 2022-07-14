import {
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Checkbox,
  Box,
  LinearProgress,
  Grid,
} from "@mui/material";
import UserForm from "./UserForm";
import { Edit, Delete, Add, Send } from "@mui/icons-material";
import useTable from "../../components/useTable";
import * as userService from "../../services/userService";
import { useEffect, useState } from "react";
import MuiButton from "../../components/controls/Button";
import Popup from "../../components/Popup";
import { useForm } from "../../components/useForm";
import Controls from "../../components/controls/Controls";
import Notification from "../../components/Notification";
import mailTemplate from "../../components/mailTemplate";

const styles = {
  pageContent: {
    p: 3,
    m: 5,
    maxWidth: "1080px",
    display: "block",
    overflowX: "auto",
  },
  btns: {
    my: 4,
    display: "flex",
    justifyContent: "center",
  },
};

const initialFieldValues = {
  id: 0,
  _id: "",
  name: "",
  email: "",
  phone: "",
  hobbies: "",
};

const headCells = [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Mobile Number" },
  { id: "hobbies", label: "Hobbies", disableSorting: true },
  { id: "action", label: "Action", disableSorting: true },
];

const Users = () => {
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [selected, setSelected] = useState([]);
  const selectedTrue = selected.filter((item) => item.checked === true);
  const [deleteRecord, setDeleteRecord] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { values, handleInputChange, errors, setErrors, setValues } =
    useForm(initialFieldValues);
  const [openPopup, setOpenPopup] = useState(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, selected, setSelected, selectedTrue);

  const handleCheckbox = (e, index) => {
    const temp = selected.map((item, ind) =>
      ind === index ? { ...item, checked: e.target.checked } : item
    );
    setSelected(temp);
  };

  const isSelected = (index) => {
    if (selected === []) return false;
    return selected[index].checked;
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleAdd = () => {
    setValues(initialFieldValues);
    setOpenPopup(true);
  };

  const handleDelete = async (_id) => {
    const response = await userService.deleteUser(_id);
    if (response.name === "AxiosError") {
      setNotify({
        isOpen: true,
        message: "Deletion Unsuccessful! Something went wrong",
        type: "error",
      });
    } else {
      setDeleteRecord(response);
      setNotify({
        isOpen: true,
        message: "User Deleted Successfully",
        type: "error",
      });
    }
  };

  const handleSend = async () => {
    const response = await userService.sendMail(mailTemplate(selectedTrue));
    if (response.name === "AxiosError") {
      setNotify({
        isOpen: true,
        message: "Request Failed",
        type: "error",
      });
    } else {
      setNotify({
        isOpen: true,
        message: "Data Sent Successfully",
        type: "success",
      });
    }
  };

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const users = await userService.getAllUsers();
        setRecords(users);
        const temp = users.map((item) => {
          return { checked: false, item: item };
        });
        setSelected(temp);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllUsers();
  }, [values, recordForEdit, deleteRecord]);

  return (
    <>
      <Paper sx={styles.pageContent}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          User Details
        </Typography>
        <Grid sx={styles.btns}>
          <MuiButton
            text="Add User"
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleAdd()}
          />
        </Grid>

        {records === [] ? (
          <Box
            sx={{
              width: "100%",
              mt: 5,
              textAlign: "center",
            }}
          >
            <div>
              <LinearProgress />
            </div>
          </Box>
        ) : (
          <Grid item xs={12}>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map(({ item, id }, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox
                        checked={isSelected(index)}
                        onChange={(e) => handleCheckbox(e, index)}
                      />
                    </TableCell>
                    <TableCell>{id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      {item.hobbies.map((item, index) => (
                        <span key={index}>
                          {item}
                          <br></br>
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        onClick={() => {
                          openInPopup(item);
                        }}
                      >
                        <Edit />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      >
                        <Delete style={{ color: "#fc5353" }} />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
            <Grid sx={{ ...styles.btns, my: 2 }}>
              <MuiButton
                text="Send"
                variant="contained"
                disabled={selectedTrue.length === 0}
                endIcon={<Send />}
                onClick={() => handleSend()}
                sx={{ m: 3 }}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setRecordForEdit={setRecordForEdit}
        recordForEdit={recordForEdit}
      >
        <UserForm
          values={values}
          handleInputChange={handleInputChange}
          errors={errors}
          setErrors={setErrors}
          setValues={setValues}
          initialFieldValues={initialFieldValues}
          recordForEdit={recordForEdit}
          setNotify={setNotify}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Users;
