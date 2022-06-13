import * as React from 'react';
import PropTypes from 'prop-types';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTheme } from '@mui/material/styles';
import { useEffect,useState } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { isEmpty } from '../utils/Utils';
import { Collapse, TableHead, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Dialogue from './order-details/dialogue';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ClientOrdersTable({orders}) {
  const dispatch = useDispatch();
    if(isEmpty(orders)) {
        return (
          <div className="h-full flex justify-center items-center">
            <h2 className="font-black text-4xl text-gray-300 drop-shadow-sm">Vous n'avez pas encore de commandes</h2>
          </div>
        )
      }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState({state:false,id:''});
  const [details, setDetails] = useState();
  const [openmodal, setOpenmodal] = useState(false);
  const [text, setText] = useState({header:'',text:''});

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOpen = (id) => {
    setOpen({state:!open.state,id:id});
    open.state==false && (axios.get(`https://cafe-challenger-backend.herokuapp.com/order-details/orderID/${id}`)
    .then((res) => {
      setDetails(res.data);
    })
    .catch((err) => console.log(err)))
  };
  const handleClose = () => {
    setOpenmodal(false);
  };
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow className='bg-primary'>
            <TableCell style={{ width: 8,color:'white' }}>
              CommandeID
            </TableCell>
            <TableCell style={{ width: 160,color:'white' }} align="right">
              Total
            </TableCell>
            <TableCell style={{ width: 160,color:'white' }} align="center">
              Quantité
            </TableCell>
            <TableCell style={{ minWidth: 140,color:'white' }} align="center">
              Date de livraison
            </TableCell>
            <TableCell style={{ width: 160,color:'white' }} align="center">
              Téléphone
            </TableCell>
            <TableCell style={{ width: 20,color:'white' }} align="center">
              Livré
            </TableCell>
            <TableCell style={{ width: 8,color:'white' }} align="center">
              Adresse
            </TableCell>
            <TableCell style={{ width: 8,color:'white' }} align="center">
              Message
            </TableCell>
            <TableCell style={{ width: 2,color:'white' }} align="center">
              Delails
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : orders
          ).map((row) => (
            <>
            <TableRow key={row.id}>
              <TableCell style={{ width: 8 }}>
                {row.id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.total}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.quantity}
              </TableCell>
              <TableCell style={{ minWidth: 140 }} align="center">
              Le :{String(row.delivery_date).slice(0,10)} à : {String(row.delivery_date).slice(11,16)}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.phone_number}
              </TableCell>
              <TableCell style={{ width: 20 }} align="center">
                {row.delivered==0 ? <p style={{color:'red'}}>No</p> : <p style={{color:'green'}}>No</p>}
              </TableCell>
              <TableCell style={{ width: 8 }} align="center">
                <IconButton aria-label="adresse" size="small" style={{color:'#ffa726'}}>
                  <LocationOnIcon fontSize="small" onClick={()=>(setText({header:'Location',text:row.address}),setOpen(true))} />
                </IconButton>
              </TableCell>
              <TableCell style={{ width: 8 }} align="center">
                <IconButton aria-label="message" size="small" color='success'>
                  <EmailIcon fontSize="small" onClick={()=>(setText({header:'Message',text:row.message}),setOpen(true))} />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={()=>handleOpen(row.id)}
                >
                  {open.state && open.id==row.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open.state && open.id==row.id} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Détails de la commande
                  </Typography>
                  <Table size='small' aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Produit</TableCell>
                        <TableCell align="right">Prix (DH)</TableCell>
                        <TableCell align="right">Quantité</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!isEmpty(details) && details.map((row)=>(
                        <TableRow key={row.id}>
                        <TableCell>{row.title}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow></>
      
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    <Dialogue onClick={handleClose} open={openmodal}  header={text.header} text={text.text} />
    </>
  );
}