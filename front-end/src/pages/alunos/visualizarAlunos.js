import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Button,
  Box,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Card, CardHeader } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import { notify } from "../../utils/notify";
import ModalLoading from "../../components/modalLoading/modalLoading";
import LogoutButton from "../../components/logoutButton/logoutButton";

function createData(id, name, email, genero) {
  return {
    id,
    name,
    email,
    genero,
  };
}

const headCells = [
  {
    name: "id",
    numeric: false,
    disablePadding: false,
    label: "id",
    sort: true,
  },
  {
    name: "name",
    numeric: false,
    disablePadding: false,
    label: "name",
    sort: false,
  },
  {
    name: "email",
    numeric: false,
    disablePadding: false,
    label: "email",
    sort: false,
  },
  {
    name: "genero",
    numeric: false,
    disablePadding: false,
    label: "genero",
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
        {headCells.map((headCell) => (
          <TableCell key={headCell.name} padding={"default"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
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

const VisualizarAlunos = () => {
  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsFilter, setRowsFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await api.get("api/pessoas/v1/aluno");

        console.log("response@@@@@@@@@@@");
        console.log(response);
        const employees = response.map((employee) => {
          return createData(
            employee.id,
            employee.name,
            employee.email,
            employee.genero
          );
        });
        setRows(employees);
        setRowsFilter(employees);
        setAllRows(response);
        setLoading(false);
      } catch (error) {
        // notify(error);
        console.log(error);
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleNewInsert = () => {
    history.push("/criarAlunos");
  };

  const handleEdit = (id) => {
    const rowEdit = allRows.find((rw) => rw.id === id);
    if (rowEdit) {
      history.push("/modificarAlunos", { row: rowEdit });
    } else {
      notify("Registro não encontrado.");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Você realmente quer apagar o Aluno: ${name}`)) {
      const rowDelete = allRows.find((rw) => rw.id === id);

      if (rowDelete) {
        try {
          setLoading(true);

          const deleteItem = await api.delete(`api/pessoas/v1/aluno/${id}`);

          if (deleteItem) {
            const removeItem = rows.filter((item) => item.id !== id);
            setRows(removeItem);
            setRowsFilter(removeItem);
            notify("Aluno deletado com sucesso.", true, "info");
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          notify("Falha ao deletar aluno");
        }
      } else {
        notify("Registro não encontrado.");
      }
    }
  };

  return (
    <>
      <LogoutButton />
      {loading && <ModalLoading loading={loading} />}

      <div>
        <div className="containerTable">
          <>
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
                    {rowsFilter.map((row, index) => {
                      return (
                        <TableRow hover tabIndex={-1} key={index}>
                          <TableCell align="left">{row.id}</TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">{row.genero}</TableCell>
                          <TableCell align="left">
                            <Tooltip title="Editar">
                              <IconButton
                                aria-label="edit"
                                onClick={() => handleEdit(row.id)}
                              >
                                <EditIcon className="iconAtivo" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Deletar">
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDelete(row.id, row.name)}
                              >
                                <DeleteIcon className="iconAtivo" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </>
        </div>
      </div>
    </>
  );
};

export default VisualizarAlunos;
