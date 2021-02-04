import React, { useState, useEffect } from "react";
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
import { Card, CardHeader } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import generateNewArrFilterBy from "../../utils/generateNewArrFilter";
import api from "../../services/api";
import { notify } from "../../utils/notify";
import ModalLoading from "../../components/modalLoading/modalLoading";

function createData(Id, Descricao) {
  return {
    Id,
    Descricao,
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
    sort: false,
  },
  {
    name: "Email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    sort: false,
  },
  {
    name: "Genero",
    numeric: false,
    disablePadding: false,
    label: "Genero",
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

const PreviewAlunos = () => {
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
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await api.get("public/alunos/getAll");

        const employees = response.map(employee => {
          return createData(employee.Id, employee.Nome, employee.Email, employee.Genero);
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
  }, []);

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
    history.push("/createCancellation");
  };

  const handleEdit = Id => {
    const rowEdit = allRows.find(rw => rw.Id === Id);
    if (rowEdit) {
      history.push("/updateCancellation", { row: rowEdit });
    } else {
      notify("Registro não encontrado.");
    }
  };

  const handleDelete = async Id => {
    if (
      window.confirm(
        `Você realmente quer apagar o Aluno: ${Id}`
      )
    ) {
      const rowDelete = allRows.find(rw => rw.Id === Id);

      if (rowDelete) {
        try {
          setLoading(true);

          const deleteItem = await api.delete(`public/alunos/delete/${Id}`);

          if (deleteItem) {
            const removeItem = rows.filter(item => item.Id !== Id);
            setRows(removeItem);
            setRowsFilter(removeItem);
            notify(
              "Aluno deletado com sucesso.",
              true,
              "info"
            );
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      } else {
        notify("Registro não encontrado.");
      }
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
                  <div style={{ marginRight: "16%" }}>
                    <label className="title">Alunos</label>
                  </div>
                  <img
                    alt="Filtro"
                    src="img/filtro.svg"
                    className="iconFiltro"
                  />
                  <TextField
                    select
                    style={{ marginRight: 30, width: 670 }}
                    label="Coluna para o filtro"
                    value={columnFilter}
                    onChange={e => setColumnFilter(e.target.value)}
                  >
                    {["", "Id", "Descricao"].map(option => (
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
                            <TableCell align="left">{row.Genero}</TableCell>
                            <TableCell align="left">
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
                              <Tooltip title="Deletar">
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleDelete(row.Id)}
                                >
                                  <img
                                    alt="Deletar"
                                    src="img/excluir.svg"
                                    className="iconAtivo"
                                  />
                                </IconButton>
                              </Tooltip>
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
