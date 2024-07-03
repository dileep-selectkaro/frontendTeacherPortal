import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, Autocomplete } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, updatingFunction } from '../../../redux/userRelated/userHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getSclassList, getSectionList } from '../../../redux/userRelated/systemHandle';
import { setPopupMessage, underControl } from '../../../redux/userRelated/userSlice';
import { BootstrapDialog } from '../../../utils/styles';
import { Close, DriveFileRenameOutline } from '@mui/icons-material';

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const {
    currentUser, currentToken, loading, sectionList,
    status, error, response, sclassList, responseSclassList
  } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getSclassList(currentToken, "allSclassList"));
  }, [currentToken, dispatch]);

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address))
  }

  const [open, setOpen] = useState(false);
  const [classID, setClassID] = useState({});
  const [sclassName, setSclassName] = useState("");
  const [sections, setSections] = useState([]);

  const dialogOpener = (row) => {
    dispatch(getSectionList(currentToken))
    setOpen(true);
    setClassID(row.id)
    setSclassName(row.name)
    setSections(row?.data?.sections)
  };

  const editHandler = () => {
    const fields = { sclassName, sections }
    dispatch(updatingFunction(classID, fields, "sclassUpdate", currentToken))
  };

  const handleClose = () => { setOpen(false) };

  const sclassNameChanger = (event) => setSclassName(event.target.value)

  useEffect(() => {
    if (status === 'updated') {
      setOpen(false);
      dispatch(getSclassList(currentToken, "allSclassList"));
      dispatch(underControl())
    }
    else if (status === 'deleted') {
      dispatch(getSclassList(currentToken, "allSclassList"));
      dispatch(underControl())
    }
    else if (status === 'failed') {
      setOpen(false);
      dispatch(setPopupMessage(response))
      dispatch(underControl())
    }
    else if (status === 'error') {
      setOpen(false);
      dispatch(setPopupMessage("Network Error"))
      dispatch(underControl())
    }
  }, [status, error, response, dispatch, currentToken]);

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
    { id: 'sections', label: 'Sections', minWidth: 170 },
  ]

  const sclassRows = sclassList && sclassList.length > 0 && sclassList.map((sclass) => {
    const sectionNames = sclass?.sections?.map(item => item?.sectionName).join(', ');

    return {
      name: sclass.sclassName,
      sections: sectionNames,
      data: sclass,
      id: sclass._id,
    };
  });

  const SclassButtonHaver = ({ row }) => {

    const actions = [
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];

    return (
      <ButtonContainer>
        <Tooltip title="Edit">
          <IconButton onClick={() => dialogOpener(row)} color="secondary">
            <DriveFileRenameOutline color="primary" />
          </IconButton >
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => deleteHandler(row.id, "Sclass")} color="secondary">
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
        <BlueButton variant="contained"
          onClick={() => navigate("/Admin/classes/class/" + row.id)}>
          View
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Add Students">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <h5>Add</h5>
              <SpeedDialIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: styles.styledPaper,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action, index) => (
            <MenuItem onClick={action.action} key={index}>
              <ListItemIcon fontSize="small">
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Class',
      action: () => navigate("/Admin/classes/add")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <>
      {
        loading ?
          <div>Loading...</div>
          :
          <>
            {responseSclassList ?
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <GreenButton variant="contained" onClick={() => navigate("/Admin/classes/add")}>
                  Add Class
                </GreenButton>
              </Box>
              :
              <>
                {Array.isArray(sclassList) && sclassList.length > 0 &&
                  <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                }
                <SpeedDialTemplate actions={actions} />
              </>
            }
          </>
      }
      <BootstrapDialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Class
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Class Name"
            value={sclassName}
            onChange={sclassNameChanger}
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth>
            <Autocomplete
              multiple
              id="sections"
              options={sectionList}
              getOptionLabel={(option) => option.sectionName || ''}
              value={sections}
              onChange={(event, newValue) => setSections(newValue)}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Sections" />
              )}
              filterSelectedOptions
              required
              isOptionEqualToValue={(option, value) => option._id === value._id}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={editHandler}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;