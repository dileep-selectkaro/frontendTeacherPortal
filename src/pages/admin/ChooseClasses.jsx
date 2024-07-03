import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BlueButton, GreenButton } from '../../components/buttonStyles';
import TableTemplate from '../../components/TableTemplate';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import styled from 'styled-components';
import { getSclassList } from '../../redux/userRelated/systemHandle';

const ChooseClasses = ({ path, Path }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        loading, currentToken, sclassList, responseSclassList
    } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSclassList(currentToken, "allSclassList"));
    }, [currentToken, dispatch]);

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ]

    const sclassRows = sclassList && sclassList.length > 0 && sclassList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    })

    const SclassButtonHaver = ({ row }) => {
        const actions = [
            { icon: <PostAddIcon />, name: `Add ${Path}s`, action: () => navigate(`/Admin/${path}s/add/${row.id}`) },
        ];
        return (
            <ButtonContainer>
                <BlueButton variant="contained"
                    onClick={() => navigate(`/Admin/${path}s/${row.id}`)}>
                    View {Path}s
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

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {responseSclassList ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            You have no classes currently.
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/classes/add")}>
                                Add Class
                            </GreenButton>
                        </Box>
                        :
                        <>
                            {Array.isArray(sclassList) && sclassList.length > 0 &&
                                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                            }
                        </>
                    }
                </>
            }
        </>
    );
};

export default ChooseClasses;

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