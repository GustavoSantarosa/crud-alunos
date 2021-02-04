exports.GlobalVariables = {
  ACCESS_FIRST: 1,
  ADM_QYON: "4",
  TIPO_PROMOTOR_CONSULTOR: "1",
  TIPO_PROMOTOR_FRANQUIA: "2",
  TIPO_PROMOTOR_CONTADOR: "3",
  TIPO_PROMOTOR_ENTIDADE: "4",

  TIPO_PROMOTOR: {
    1: {
      Promoter: "IdPromotorConsultor",
      User: "IdUsuarioConsultor",
      Date: "DataConsultor",
    },
    2: {
      Promoter: "IdPromotorFranquia",
      User: "IdUsuarioFranquia",
      Date: "DataFranquia",
    },
    3: {
      Promoter: "IdPromotorContador",
      User: "IdUsuarioContador",
      Date: "DataContador",
    },
    4: {
      Promoter: "IdPromotorEntidade",
      User: "IdUsuarioEntidade",
      Date: "DataEntidade",
    },
  },
};
