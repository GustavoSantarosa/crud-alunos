import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Card, CardHeader } from "reactstrap";
import MaskService from "../../utils/mask/maskService";
import "react-toastify/dist/ReactToastify.css";
import generateNewArrFilterBy from "../../utils/generateNewArrFilter";
import api from "../../services/api";
import { notify } from "../../utils/notify";
import ModalLoading from "../../components/modalLoading/modalLoading";
import "../../styles/global.css";
import UserContext from "../../context/user";

function createData(
  Id,
  Nome,
  Email,
  Telefone,
  Promotor,
  TipoUsuario,
  PerfilAcesso,
  FlagAtivo
) {
  return {
    Id,
    Nome,
    Email,
    Telefone,
    Promotor,
    TipoUsuario,
    PerfilAcesso,
    Ativo: FlagAtivo,
  };
}

const headCells = [
  {
    name: "Id",
    numeric: false,
    disablePadding: false,
    label: "Id",
    sort: true,
  },
  {
    name: "Nome",
    numeric: false,
    disablePadding: false,
    label: "Nome",
    sort: true,
  },
  {
    name: "Email",
    numeric: false,
    disablePadding: false,
    label: "E-mail",
    sort: false,
  },
  {
    name: "Telefone",
    numeric: false,
    disablePadding: false,
    label: "Telefone",
    sort: false,
  },
  {
    name: "Promotor",
    numeric: false,
    disablePadding: false,
    label: "Promotor",
    sort: false,
  },
  {
    name: "TipoUsuario",
    numeric: false,
    disablePadding: false,
    label: "Tipo de Usuario",
    sort: false,
  },
  {
    name: "PerfilAcesso",
    numeric: false,
    disablePadding: false,
    label: "Perfil de Acesso",
    sort: false,
  },
  {
    name: "FlagAtivo",
    numeric: false,
    disablePadding: false,
    label: "Ativo",
    sort: false,
  },
  {
    name: "Acoes",
    numeric: false,
    disablePadding: false,
    label: "Ações",
    sort: false,
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.name} padding={"default"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  row: {
    margin: "1px",
  },
}));

const PreviewUsers = () => {
  const [user] = useContext(UserContext);
  const [actionsPermission, setActionsPermission] = useState({
    edit: false,
  });
  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsFilter, setRowsFilter] = useState([]);
  const [columnFilter, setColumnFilter] = useState([]);

  useEffect(() => {
    if (user && user.accessRoutes) {
      const actionPermission = {
        edit: user.accessRoutes.indexOf("/updateUser") === -1 ? false : true,
      };

      setActionsPermission(actionPermission);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await api.get(
          `usuario/todos/${user.IdTipoUsuario}/:${user.PromotorCNPJ}`
        );

        const employees = response.map(employee => {
          return createData(
            employee.Id,
            employee.Nome,
            employee.Email,
            employee.Telefone,
            employee.Promotor,
            employee.TipoUsuario,
            employee.PerfilAcesso,
            employee.FlagAtivo
          );
        });
        setRows(employees);
        setRowsFilter(employees);
        setAllRows(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.nome);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleNewInsert = () => {
    history.push("/createUser");
  };

  const handleEdit = Id => {
    const rowEdit = allRows.find(rw => rw.Id === Id);
    if (rowEdit) {
      history.push("/updateUser", { row: rowEdit });
    } else {
      notify("Registro não encontrado.");
    }
  };

  const handleSearch = e => {
    const result = generateNewArrFilterBy({
      input: columnFilter,
      value: e.target.value,
      allRows: rows,
    });
    setRowsFilter(result);
    setPage(0);
  };

  return (
    <>
      {loading && <ModalLoading loading={loading} />}

      <div>
        <div className="containerTable">
          <ContentWrapper>
            <Card className="card-default">
              <CardHeader className={classes.row}>
                <Box
                  display="flex"
                  p={0}
                  style={{ paddingLeft: "7px", alignItems: "center" }}
                >
                  <div style={{ marginRight: "17%" }}>
                    <label className="title">Usuários</label>
                  </div>
                  <img
                    alt="Filtro"
                    src="img/filtro.svg"
                    className="iconFiltro"
                  />
                  <TextField
                    select
                    style={{ marginRight: 30, width: 770 }}
                    label="Coluna para o filtro"
                    value={columnFilter}
                    onChange={e => setColumnFilter(e.target.value)}
                  >
                    {[
                      "",
                      "Id",
                      "Nome",
                      "Email",
                      "Telefone",
                      "Promotor",
                      "TipoUsuario",
                      "PerfilAcesso",
                      "Ativo",
                    ].map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel>Parâmetro para o filtro</InputLabel>
                    <Input
                      type="text"
                      onChange={e => handleSearch(e)}
                      style={{ width: 200 }}
                    />
                  </FormControl>

                  <Box p={2}>
                    <Button
                      variant="contained"
                      size="large"
                      id="buttonInserir"
                      onClick={handleNewInsert}
                    >
                      <img
                        src="img/inserir.svg"
                        className="iconInserir"
                        alt="Inserir"
                      />
                      INSERIR
                    </Button>
                  </Box>
                </Box>
              </CardHeader>
              <hr />
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size="medium"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rowsFilter.length}
                  />
                  <TableBody>
                    {rowsFilter
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow hover tabIndex={-1} key={index}>
                            <TableCell align="left">{row.Id}</TableCell>
                            <TableCell align="left">{row.Nome}</TableCell>
                            <TableCell align="left">{row.Email}</TableCell>
                            <TableCell align="left">
                              {MaskService.toMask("cel-phone", row.Telefone)}
                            </TableCell>
                            <TableCell align="left">{row.Promotor}</TableCell>
                            <TableCell align="left">
                              {row.TipoUsuario}
                            </TableCell>
                            <TableCell align="left">
                              {row.PerfilAcesso}
                            </TableCell>
                            <TableCell align="left">
                              {row.Ativo === "S" ? (
                                <img
                                  alt="Ativo"
                                  src="img/ativo.svg"
                                  className="iconAtivo"
                                />
                              ) : (
                                <CloseIcon color="error" />
                              )}
                            </TableCell>

                            <TableCell align="left">
                              {actionsPermission.edit && (
                                <Tooltip title="Editar">
                                  <IconButton
                                    aria-label="edit"
                                    onClick={() => handleEdit(row.Id)}
                                  >
                                    <img
                                      alt="Editar"
                                      src="img/acoes.svg"
                                      className="iconAtivo"
                                    />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={9} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rowsFilter.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={"Linhas por página"}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Card>
          </ContentWrapper>
        </div>
      </div>
    </>
  );
};

export default PreviewUsers;
