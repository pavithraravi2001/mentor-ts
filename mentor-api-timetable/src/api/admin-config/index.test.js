import {
  ApplicationTableConfigModel,
  EmailTemplateConfigModel,
  EmployeeTableConfigModel,
  PaymentConfigs,
  StudentTableConfigModel,
  TableMetaDataConfigModel,
} from "./model";
import {
  addApplicationTableConfigService,
  addEmailTemplateConfigService,
  addEmployeeTableConfigService,
  addPaymentConfigService,
  addStudentTableConfigService,
  getAllApplicationTableConfigService,
  getAllEmployeeTableConfigService,
  getAllStudentTableConfigService,
  getApplicationTableConfigService,
  getEmailTemplateConfigByNameService,
  getEmailTemplateConfigService,
  getEmployeeTableConfigService,
  getMetaDataTableNamesService,
  getPaymentConfigService,
  getStudentTableConfigService,
  getTableMetaDataConfigService,
  updateApplicationTableConfigsService,
  updateEmailTemplateConfigService,
  updateEmployeeTableConfigsService,
  updatePaymentConfigService,
  updateStudentTableConfigsService,
  upsertTableMetaDtaConfigService,
  getMongoSchemaByEntityNameService,
} from "./service";
const mockObjectId = "6d6f636b4f626a6563744964";

jest.mock("./model", () => ({
  PaymentConfigs: {
    find: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
  },
  ApplicationTableConfigModel: {
    create: jest.fn(),
    insertMany: jest.fn(),
    bulkWrite: jest.fn(),
    find: jest.fn(),
    select: jest.fn(),
  },
  EmployeeTableConfigModel: {
    create: jest.fn(),
    insertMany: jest.fn(),
    bulkWrite: jest.fn(),
    find: jest.fn(),
    select: jest.fn(),
  },
  StudentTableConfigModel: {
    create: jest.fn(),
    insertMany: jest.fn(),
    bulkWrite: jest.fn(),
    find: jest.fn(),
    select: jest.fn(),
  },
  EmailTemplateConfigModel: {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  },
  TableMetaDataConfigModel: {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    select: jest.fn(),
  },
}));

jest.mock("../application/model", () => ({
  Application: {
    jsonSchema: jest.fn(),
  },
  InterviewScheduler: {
    jsonSchema: jest.fn(),
  },
}));

jest.mock("../student/model", () => ({
  Student: {
    jsonSchema: jest.fn(),
  },
}));

jest.mock("../employee/model", () => ({
  Employee: {
    jsonSchema: jest.fn(),
  },
}));

describe("Admin Configs API - Mock testing", () => {
  const mockPaymentConfig = {
    paymentModeOnly: "Yes",
    gatewayName: "PaytM",
    merchantId: "FmLuTv131177711342189",
    merchantKey: "3m@mOZS5tS8T9vwg",
    gateWayURL: "https://securegw-stage.paytm.in",
    website: "WEBSTAGINGS",
    industryTypeID: "Retail",
    channelId: "WEB",
    orderProcessURLPath: "/order/process",
    paymentTypeId: "UPI,CC,NB",
    applicationTxnAmount: "300",
    totalTxnAmount: "345",
    applicationTxnTax: "46",
    admissionFeeTxnAmount: "300",
    totalAdmissionFeeTxnAmount: "345",
    admissionFeeTxnTax: "45",
  };

  const mockApplicationTableConfig = {
    displayName: "Application",
    fieldName: "Applicant Number",
    fieldType: "string",
    sortable: true,
    optional: true,
    tableNames: "applicationTable",
    filter: true,
  };

  const mockEmployeeTableConfig = {
    displayName: "Employee",
    fieldName: "Employee Number",
    fieldType: "string",
    sortable: true,
    optional: true,
    tableNames: "employeeTable",
    filter: true,
  };

  const mockStudentTableConfig = {
    displayName: "Student Table",
    fieldName: "studentName",
    fieldType: "string",
    sortable: true,
    optional: true,
    tableNames: "studentTable",
    filter: true,
  };

  const mockMetadataTableConfig = {
    _id: "65151ae7ed1968322c86e611",
    tableName: "Student Table",
    entityName: "Pending",
    columns: [
      {
        displayName: "Student",
        fieldName: "studentName",
        fieldType: "string",
        fieldTypeFormat: "string",
        tooltip: "string",
        sortable: true,
        optional: true,
        order: 0,
        filterable: true,
      },
    ],
  };

  const mockEmailTemplate = {
    _id: "65151ae7ed1968322c86e611",
    name: "Greeting",
    content: "Thanks to login",
  };

  test("POST addPaymentConfigService - 201", async () => {
    PaymentConfigs.create.mockResolvedValue(mockPaymentConfig);
    const result = await addPaymentConfigService(mockPaymentConfig);
    expect(PaymentConfigs.create).toHaveBeenCalledWith(mockPaymentConfig);
    expect(result).toEqual(mockPaymentConfig);
  });

  test("POST addPaymentConfigService - Error", async () => {
    const errorMessage = "Invalid request data";
    PaymentConfigs.create.mockRejectedValue(new Error(errorMessage));
    try {
      await addPaymentConfigService(mockPaymentConfig);
    } catch (error) {
      expect(PaymentConfigs.create).toHaveBeenCalledWith(mockPaymentConfig);
      expect(error.message).toEqual(errorMessage);
    }
  });

  test("PUT updatePaymentConfigService 200", async () => {
    PaymentConfigs.findOneAndUpdate.mockResolvedValue(mockPaymentConfig);
    try {
      const result = await updatePaymentConfigService(
        { _id: "65151ae7ed1968322c86e611" },
        mockPaymentConfig
      );
      expect(result).toEqual(mockPaymentConfig);
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT updatePaymentConfigService - Error", async () => {
    PaymentConfigs.findOneAndUpdate.mockRejectedValue(
      new Error("Update failed")
    );
    try {
      const result = await updatePaymentConfigService(
        { _id: "65151ae7ed1968322c86e611" },
        mockPaymentConfig
      );
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error.message).toBe("Update failed");
    }
  });

  test("GET getPaymentConfigService 200", async () => {
    PaymentConfigs.find.mockResolvedValue(mockPaymentConfig);
    try {
      const result = await getPaymentConfigService();
      expect(PaymentConfigs.find).toHaveBeenCalled();
      expect(result).toEqual(mockPaymentConfig);
    } catch (error) {
      console.log(error);
    }
  });

  test("GET getPaymentConfigService - Error Handling", async () => {
    const errorMessage = "Error fetching payment configurations";
    PaymentConfigs.find.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await getPaymentConfigService();
    } catch (error) {
      expect(PaymentConfigs.find).toHaveBeenCalled();
      expect(error.message).toEqual(errorMessage);
    }
  });

  test("POST addApplicationTableConfigService - 201", async () => {
    ApplicationTableConfigModel.insertMany.mockResolvedValue(
      mockApplicationTableConfig
    );
    const result = await addApplicationTableConfigService(
      mockApplicationTableConfig
    );
    expect(ApplicationTableConfigModel.insertMany).toHaveBeenCalledWith(
      mockApplicationTableConfig
    );
    expect(result).toEqual(mockApplicationTableConfig);
  });

  test("POST addApplicationTableConfigService - Error Handling", async () => {
    const errorMessage = "Error inserting application table configuration";
    ApplicationTableConfigModel.insertMany.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await addApplicationTableConfigService(
        mockApplicationTableConfig
      );
    } catch (error) {
      expect(ApplicationTableConfigModel.insertMany).toHaveBeenCalledWith(
        mockApplicationTableConfig
      );
      expect(error.message).toEqual(errorMessage);
    }
  });

  test("PUT updateApplicationTableConfigsService 200", async () => {
    ApplicationTableConfigModel.bulkWrite = jest
      .fn()
      .mockResolvedValue(mockApplicationTableConfig);
    try {
      const result = await updateApplicationTableConfigsService([
        { _id: "65151ae7ed1968322c86e611", name: "Updated Record" },
      ]);

      expect(ApplicationTableConfigModel.bulkWrite).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            updateOne: {
              filter: { _id: "65151ae7ed1968322c86e611" },
              update: { $set: { name: "Updated Record" } },
            },
          }),
        ])
      );

      expect(result).toEqual(mockApplicationTableConfig);
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT updateApplicationTableConfigsService - Invalid Params", async () => {
    try {
      await updateApplicationTableConfigsService([]);
    } catch (error) {
      expect(error.message).toEqual("Invalid Params");
    }
  });

  test("PUT updateApplicationTableConfigsService insert new documents when _id is not provided", async () => {
    const itemsToInsert = [
      { fieldName: "Field 1", value: "Value 1" },
      { fieldName: "Field 2", value: "Value 2" },
    ];
    ApplicationTableConfigModel.bulkWrite = jest.fn().mockResolvedValue({});
    try {
      const result = await updateApplicationTableConfigsService(itemsToInsert);
      expect(ApplicationTableConfigModel.bulkWrite).toHaveBeenCalledWith(
        itemsToInsert.map((item) => ({
          insertOne: {
            document: item,
          },
        }))
      );
      expect(result).toBeUndefined();
    } catch (error) {
      console.error(error);
    }
  });

  test("GET getAllApplicationTableConfigService", async () => {
    jest.spyOn(ApplicationTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockResolvedValue([mockApplicationTableConfig]),
      };
    });
    const result = await getAllApplicationTableConfigService();
    expect(result).toEqual([mockApplicationTableConfig]);
    jest.restoreAllMocks();
  });

  test("GET getAllApplicationTableConfigService with error", async () => {
    const mockError = "Failed to fetch application table config";
    jest.spyOn(ApplicationTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockRejectedValue(mockError),
      };
    });
    try {
      const result = await getAllApplicationTableConfigService();
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  test("GET getApplicationTableConfigService", async () => {
    jest.spyOn(ApplicationTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockResolvedValue([mockApplicationTableConfig]),
      };
    });
    const result = await getApplicationTableConfigService(
      mockApplicationTableConfig.tableNames
    );
    expect(result).toEqual([mockApplicationTableConfig]);
    jest.restoreAllMocks();
  });

  test("GET getApplicationTableConfigService with error", async () => {
    const mockError = "Failed to fetch application table config";
    jest.spyOn(ApplicationTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockRejectedValue(mockError),
      };
    });
    try {
      const result = await getApplicationTableConfigService({
        tableNames: "Application",
      });
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  test("POST addEmployeeTableConfigService - 201", async () => {
    EmployeeTableConfigModel.insertMany.mockResolvedValue(
      mockEmployeeTableConfig
    );
    const result = await addEmployeeTableConfigService(mockEmployeeTableConfig);
    expect(EmployeeTableConfigModel.insertMany).toHaveBeenCalledWith(
      mockEmployeeTableConfig
    );
    expect(result).toEqual(mockEmployeeTableConfig);
  });

  test("POST addEmployeeTableConfigService - Error Handling", async () => {
    const errorMessage = "Error inserting employee table configuration";
    EmployeeTableConfigModel.insertMany.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await addEmployeeTableConfigService(
        mockEmployeeTableConfig
      );
    } catch (error) {
      expect(EmployeeTableConfigModel.insertMany).toHaveBeenCalledWith(
        mockEmployeeTableConfig
      );
      expect(error.message).toEqual(errorMessage);
    }
  });

  test("PUT updateEmployeeTableConfigsService 200", async () => {
    const mockExistingConfig = {
      _id: "65151ae7ed1968322c86e611",
    };
    EmployeeTableConfigModel.bulkWrite.mockResolvedValue({
      modifiedCount: 1,
    });
    try {
      const result = await updateEmployeeTableConfigsService(
        [mockExistingConfig],
        mockEmployeeTableConfig
      );
      expect(result.modifiedCount).toBe(1);
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT updateEmployeeTableConfigsService 201", async () => {
    EmployeeTableConfigModel.bulkWrite.mockResolvedValue({
      upsertedCount: 1,
    });
    try {
      const result = await updateEmployeeTableConfigsService([
        mockEmployeeTableConfig,
      ]);
      expect(result.upsertedCount).toBe(1);
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT updateEmployeeTableConfigsService - Invalid Params", async () => {
    try {
      await updateEmployeeTableConfigsService([]);
    } catch (error) {
      expect(error.message).toEqual("Invalid Params");
    }
  });

  test("GET getAllEmployeeTableConfigService", async () => {
    jest.spyOn(EmployeeTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockResolvedValue([mockEmployeeTableConfig]),
      };
    });
    const result = await getAllEmployeeTableConfigService();
    expect(result).toEqual([mockEmployeeTableConfig]);
    jest.restoreAllMocks();
  });

  test("GET getAllEmployeeTableConfigService with error", async () => {
    const mockError = "Failed to fetch employee table config";
    jest.spyOn(EmployeeTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockRejectedValue(mockError),
      };
    });
    try {
      const result = await getAllEmployeeTableConfigService();
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  test("GET getEmployeeTableConfigService", async () => {
    jest.spyOn(EmployeeTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockResolvedValue([mockEmployeeTableConfig]),
      };
    });
    const result = await getEmployeeTableConfigService(
      mockEmployeeTableConfig.tableNames
    );
    expect(result).toEqual([mockEmployeeTableConfig]);
    jest.restoreAllMocks();
  });

  test("GET getEmployeeTableConfigService with error", async () => {
    const mockError = "Failed to fetch employee table config";
    jest.spyOn(EmployeeTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockRejectedValue(mockError),
      };
    });
    try {
      const result = await getEmployeeTableConfigService({
        tableNames: "Employee",
      });
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  test("POST addStudentTableConfigService - 201", async () => {
    StudentTableConfigModel.insertMany.mockResolvedValue(
      mockStudentTableConfig
    );
    const result = await addStudentTableConfigService(mockStudentTableConfig);
    expect(StudentTableConfigModel.insertMany).toHaveBeenCalledWith(
      mockStudentTableConfig
    );
    expect(result).toEqual(mockStudentTableConfig);
  });

  test("POST addStudentTableConfigService - Error Handling", async () => {
    const errorMessage = "Error inserting student table configuration";
    StudentTableConfigModel.insertMany.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      const result = await addStudentTableConfigService(mockStudentTableConfig);
    } catch (error) {
      expect(StudentTableConfigModel.insertMany).toHaveBeenCalledWith(
        mockStudentTableConfig
      );
      expect(error.message).toEqual(errorMessage);
    }
  });

  test("PUT updateStudentTableConfigsService 200", async () => {
    const mockExistingConfig = {
      _id: "65151ae7ed1968322c86e611",
    };
    StudentTableConfigModel.bulkWrite.mockResolvedValue({
      modifiedCount: 1,
    });
    try {
      const result = await updateStudentTableConfigsService(
        [mockExistingConfig],
        mockStudentTableConfig
      );
      expect(result.modifiedCount).toBe(1);
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT updateStudentTableConfigsService 201", async () => {
    StudentTableConfigModel.bulkWrite.mockResolvedValue({
      upsertedCount: 1,
    });
    try {
      const result = await updateStudentTableConfigsService([
        mockStudentTableConfig,
      ]);
      expect(result.upsertedCount).toBe(1);
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT updateStudentTableConfigsService - Invalid Params", async () => {
    try {
      await updateStudentTableConfigsService();
      [];
    } catch (error) {
      expect(error.message).toEqual("Invalid Params");
    }
  });

  test("GET getAllStudentTableConfigService", async () => {
    jest.spyOn(StudentTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockResolvedValue([mockStudentTableConfig]),
      };
    });
    const result = await getAllStudentTableConfigService();
    expect(result).toEqual([mockStudentTableConfig]);
    jest.restoreAllMocks();
  });

  test("GET getAllStudentTableConfigService with error", async () => {
    const mockError = "Failed to fetch student table config";
    jest.spyOn(StudentTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockRejectedValue(mockError),
      };
    });
    try {
      const result = await getAllStudentTableConfigService();
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  test("GET getStudentTableConfigService", async () => {
    jest.spyOn(StudentTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockResolvedValue([mockStudentTableConfig]),
      };
    });
    const result = await getStudentTableConfigService(
      mockStudentTableConfig.tableNames
    );
    expect(result).toEqual([mockStudentTableConfig]);
    jest.restoreAllMocks();
  });

  test("GET getStudentTableConfigService with error", async () => {
    const mockError = "Failed to fetch employee table config";
    jest.spyOn(StudentTableConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockRejectedValue(mockError),
      };
    });
    try {
      const result = await getStudentTableConfigService({
        tableNames: "Student",
      });
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  test("POST upsertTableMetaDtaConfigService", async () => {
    const expectedResult = {
      ...mockMetadataTableConfig,
      _id: "65151ae7ed1968322c86e611",
    };
    TableMetaDataConfigModel.findOneAndUpdate.mockResolvedValue(expectedResult);
    try {
      const result = await upsertTableMetaDtaConfigService(
        mockMetadataTableConfig
      );
      expect(TableMetaDataConfigModel.findOneAndUpdate).toHaveBeenCalledWith(
        { tableName: mockMetadataTableConfig.tableName },
        mockMetadataTableConfig,
        { returnNewDocument: true, upsert: true }
      );
      expect(result).toEqual(expectedResult);
    } catch (error) {
      console.log(error);
    }
  });

  test("POST upsertTableMetaDtaConfigService, Error Handling", async () => {
    const errorMessage = "Error during upsert";
    TableMetaDataConfigModel.findOneAndUpdate.mockRejectedValue(
      new Error(errorMessage)
    );
    try {
      await upsertTableMetaDtaConfigService(mockMetadataTableConfig);
    } catch (error) {
      expect(TableMetaDataConfigModel.findOneAndUpdate).toHaveBeenCalledWith(
        { tableName: mockMetadataTableConfig.tableName },
        mockMetadataTableConfig,
        { returnNewDocument: true, upsert: true }
      );
      expect(error.message).toEqual(errorMessage);
    }
  });

  test("GET getMetaDataTableNamesService", async () => {
    jest.spyOn(TableMetaDataConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockResolvedValue([mockMetadataTableConfig]),
      };
    });
    const result = await getMetaDataTableNamesService();
    expect(result).toEqual([mockMetadataTableConfig]);
    jest.restoreAllMocks();
  });

  test("GET getMetaDataTableNamesService with error", async () => {
    const mockError = "Failed to fetch metadata table config";
    jest.spyOn(TableMetaDataConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockRejectedValue(mockError),
      };
    });
    try {
      const result = await getMetaDataTableNamesService();
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  test("GET getTableMetaDataConfigService", async () => {
    const mockData = [
      {
        _id: "65151ae7ed1968322c86e611",
        tableName: "Student Table",
        entityName: "Pending",
        columns: [
          {
            displayName: "Student",
            fieldName: "studentName",
            fieldType: "string",
            fieldTypeFormat: "string",
            tooltip: "string",
            sortable: true,
            optional: true,
            order: 0,
            filterable: true,
          },
        ],
      },
    ];
    jest.spyOn(TableMetaDataConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockResolvedValue(mockData),
      };
    });
    const result = await getTableMetaDataConfigService(mockData.tableName);
    expect(result).toEqual(mockData[0].columns);
    jest.restoreAllMocks();
  });

  test("GET getTableMetaDataConfigService with error", async () => {
    const mockError = "Failed to fetch metadata table config";
    jest.spyOn(TableMetaDataConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockRejectedValue(mockError),
      };
    });
    try {
      const result = await getTableMetaDataConfigService({
        tableNames: "Metadata",
      });
      expect(result).toBeUndefined();
    } catch (error) {
      console.log(error);
    }
  });

  test("GET getTableMetaDataConfigService 404 error", async () => {
    jest.spyOn(TableMetaDataConfigModel, "find").mockImplementation(() => {
      return {
        select: jest.fn().mockResolvedValue(null),
      };
    });
    try {
      await getTableMetaDataConfigService({ tableName: "Metadata" });
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("not found");
    }
  });

  test("POST addEmailTemplateConfigService - 201", async () => {
    EmailTemplateConfigModel.create.mockResolvedValue(mockEmailTemplate);
    const result = await addEmailTemplateConfigService(mockEmailTemplate);
    expect(EmailTemplateConfigModel.create).toHaveBeenCalledWith(
      mockEmailTemplate
    );
    expect(result).toEqual(mockEmailTemplate);
  });

  test("POST addEmailTemplateConfigService - Error Handling", async () => {
    const errorMessage = "Error inserting student table configuration";
    EmailTemplateConfigModel.create.mockRejectedValue(new Error(errorMessage));
    try {
      const result = await addEmailTemplateConfigService(mockEmailTemplate);
    } catch (error) {
      expect(EmailTemplateConfigModel.create).toHaveBeenCalledWith(
        mockEmailTemplate
      );
      expect(error.message).toEqual(errorMessage);
    }
  });

  test("PUT updateEmailTemplateConfigService 200", async () => {
    EmailTemplateConfigModel.findOneAndUpdate.mockResolvedValue(
      mockEmailTemplate
    );
    try {
      const result = await updateEmailTemplateConfigService(
        { _id: "65151ae7ed1968322c86e611" },
        mockEmailTemplate
      );
      expect(result).toEqual(mockEmailTemplate);
    } catch (error) {
      console.error(error);
    }
  });

  test("PUT updateEmailTemplateConfigService Error Handling", async () => {
    const mockError = "Failed to fetch metadata table config";
    EmailTemplateConfigModel.findOneAndUpdate = jest
      .fn()
      .mockRejectedValue(new Error(mockError));
    try {
      await updateEmailTemplateConfigService(
        { name: "email" },
        mockEmailTemplate
      );
      throw new Error("The function should have thrown an error");
    } catch (error) {
      expect(error.message).toEqual(mockError);
    }
  });

  const mockEmailTemplates = [
    {
      name: "Welcome Email",
      subject: "Welcome to our platform",
      content: "Hello, welcome to our platform!",
    },
    {
      name: "Password Reset Email",
      subject: "Reset your password",
      content: "Click the link below to reset your password.",
    },
  ];

  test("GET getEmailTemplateConfigService", async () => {
    EmailTemplateConfigModel.find.mockResolvedValue(mockEmailTemplates);
    const result = await getEmailTemplateConfigService();
    expect(EmailTemplateConfigModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockEmailTemplates);
  });

  test("GET getEmailTemplateConfigService Error Handling", async () => {
    const mockError = new Error("Database error");
    EmailTemplateConfigModel.find.mockRejectedValue(mockError);
    try {
      await getEmailTemplateConfigService();
    } catch (error) {
      expect(EmailTemplateConfigModel.find).toHaveBeenCalled();
      expect(error).toEqual(mockError);
    }
  });

  test("GET getEmailTemplateConfigByNameService", async () => {
    EmailTemplateConfigModel.findOne.mockResolvedValue(mockEmailTemplates[0]);
    const result = await getEmailTemplateConfigByNameService(
      mockEmailTemplates[0].name
    );
    expect(EmailTemplateConfigModel.findOne).toHaveBeenCalled();
    expect(result).toEqual(mockEmailTemplates[0]);
  });

  test("GET getEmailTemplateConfigByNameService - Template Not Found", async () => {
    const templateName = "NonExistentTemplate";
    const mockError = {
      status: 404,
      message: `Email template '${templateName}' not found.`,
    };
    EmailTemplateConfigModel.findOne.mockResolvedValue(null);
    try {
      const result = await getEmailTemplateConfigByNameService(templateName);
    } catch (error) {
      expect(EmailTemplateConfigModel.findOne).toHaveBeenCalled();
      expect(error).toEqual(mockError);
    }
  });

  test("GET getEmailTemplateConfigByNameService Error Handling", async () => {
    const mockError = "Failed to fetch email template config";
    EmailTemplateConfigModel.findOne = jest
      .fn()
      .mockRejectedValue(new Error(mockError));
    try {
      const templateName = "demoTemplate";
      await getEmailTemplateConfigByNameService(templateName);
      throw new Error("The function should have thrown an error");
    } catch (error) {
      expect(error.message).toEqual(mockError);
    }
  });

  // test("GET getMongoSchemaByEntityNameService", async () => {
  //   const entities = [
  //     "Application",
  //     "Employee",
  //     "Student",
  //     "InterviewScheduler",
  //   ];
  //   for (const entity of entities) {
  //      jsonSchemaConfig.mockClear();
  //     const mockJsonSchema = jest.fn();
  //     jest.spyOn(jsonSchemaConfig, "default").mockImplementation(() => {
  //       return {
  //         jsonSchema: mockJsonSchema,
  //       };
  //     });
  //     const result = await getMongoSchemaByEntityNameService(entity);
  //     // expect(jsonSchemaConfig.default).toHaveBeenCalledWith({
  //     //   fieldOptionsMapping: [],
  //     //   forceRebuild: true,
  //     // });
  //     expect(mockJsonSchema).toHaveBeenCalled();
  //     expect(result).toEqual(mockJsonSchema.mock.results[0].value);
  //   }
  // });

  // test("GET getMongoSchemaByEntityNameService", async () => {
  //   //const mockJsonSchema = jest.fn();
  //   const entity = "ABC"
  //   const result = await getMongoSchemaByEntityNameService(entity);
  //   // expect(mockJsonSchema).toHaveBeenCalled();
  //   //expect(result).toEqual(mockJsonSchema.mock.results[0].value);
  // });

  test("GET getMongoSchemaByEntityNameService - Error Handling", async () => {
    const unknownEntity = "UnknownEntity";
    const result = await getMongoSchemaByEntityNameService(unknownEntity);
    expect(result).toEqual({
      message: "not found",
      available_entities: [
        "Application",
        "Employee",
        "Student",
        "InterviewScheduler",
      ],
    });
  });
});
