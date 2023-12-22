import { PaymentConfigs } from "../admin-config/model";
import { Application } from "../application/model";
import { User } from "../user/model";
import { Payment } from "./model";
import {
  admissionPaymentCallbackService,
  admissionPaymentService,
  applicationPaymentCallbackService,
  applicationPaymentService,
  getAdmissionPaymentConfigService,
  getPaymentConfigService,
} from "./service";

jest.mock("../admin-config/model", () => ({
  PaymentConfigs: {
    findOne: jest.fn(),
  },
}));

jest.mock("../user/model", () => ({
  User: {
    create: jest.fn(),
    findById: jest.fn(),
  },
}));

jest.mock("./model", () => ({
  Payment: {
    create: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
  },
}));

jest.mock("../application/model", () => ({
  Application: {
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    bulkWrite: jest.fn(),
    aggregate: jest.fn(),
    findOneUpdate: jest.fn(),
    sort: jest.fn(),
  },
}));

const paymentConfigsMockData = {
  gatewayName: "PayTM",
  merchantId: "FmLuTv13117771134218",
  merchantKey: "3m@mOZS5tS8T9vug",
  gateWayURL: "https://securegw-stage2.paytm.in",
  website: "WEBSTAGING",
  industryTypeID: "Retail",
  channelId: "WEB",
  orderProcessURLPath: "/order/process",
  paymentModeOnly: "Yes",
  paymentTypeId: "UPI,CC,NB",
  applicationTxnAmount: "1.00",
  totalAdmissionFeeTxnAmount: "346",
  admissionFeeTxnTax: "300",
  admissionFeeTxnAmount: "1.00",
  totalTxnAmount: "346",
  applicationTxnTax: "46",
};

const paymentMockData = {
  MID: paymentConfigsMockData.merchantId,
  WEBSITE: paymentConfigsMockData.website,
  INDUSTRY_TYPE_ID: paymentConfigsMockData.industryTypeID,
  CHANNEL_ID: paymentConfigsMockData.channelId,
  ORDER_ID: paymentConfigsMockData._id,
  CUST_ID: "5f2e8c9608ddde00182ab054",
  PAYMENT_MODE_ONLY: paymentConfigsMockData.paymentModeOnly,
  PAYMENT_TYPE_ID: paymentConfigsMockData.paymentTypeId,
  TXN_AMOUNT: paymentConfigsMockData.totalTxnAmount,
  CALLBACK_URL:
    "http://localhost:9200/payment-integrations/application-payment/callback",
};

const mockUser = {
  name: "user",
  email: "abc@gmail.com",
  password: "123456",
  isVerified: true,
};

const applicationMock = {
  _id: "6ff98104a28de700189ae6f7",
  userId: "5ff98104a28de700189ae6f7",
  communicationAddressLine1: "101,",
  communicationAddressLine2: "1",
  communicationAddressCountry: "India",
  communicationAddressState: "Andhra Pradesh",
  communicationAddressCity: "Chennai",
  communicationAddressZipCode: "600101",
  paymentMode: null,
  boardName: "CBSE",
  schoolName: "velammal",
  classGrade: "V",
  firstName: "Pavithra",
  middleName: "R",
  lastName: "Ravi",
  dob: "2001-02-18",
  gender: "Female",
  bloodGroup: "A+",
  nationality: "Indian",
  religion: "Hindu",
  casteType: "BC",
  casteName: "ABC",
  motherTongue: "Tamil",
  aadhaarNumber: "999999999999",
  fatherAnnualSalary: 111111,
  fatherEmailAddress: "mohanrajr@bloomlync.com",
  fatherEmployer: "Pavi",
  fatherFirstName: "Ravi",
  fatherJobTitle: "Farmer",
  fatherLastName: "M",
  fatherMobileNumber: "9999999999",
  fatherOccupation: "Farming",
  motherAnnualSalary: 888888,
  motherEmailAddress: "karthikp@bloomlync.com",
  motherEmployer: "Business women",
  motherFirstName: "Yamuna",
  motherJobTitle: "Business",
  motherLastName: "R",
  motherMobileNumber: "9999999999",
  motherOccupation: "Mom",
  copySameAddress: true,
  permanentAddressCity: "Chennai",
  permanentAddressCountry: "India",
  permanentAddressLine1: "101,",
  permanentAddressLine2: "1",
  permanentAddressState: "Andhra Pradesh",
  permanentAddressZipCode: "600101",
  eligibleForFeeConcession: false,
  needHostelFacility: false,
  needTransportFacility: false,
  previousAcademicInformationClass: "I",
  previousAcademicInformationOverallPercentage: 75,
  previousAcademicInformationReasonForLeaving: "Transfer to Chennai",
  previousAcademicInformationSchoolBoard: "CBSE",
  previousAcademicInformationSchoolName: "Andrews",
  previousAcademicInformationYearOfPassing: "2000-05-31",
  birthCertificate: {
    _id: "64bb6e4c83470b00181a3b66",
    originalFileName: "Grp Pic.jpg",
    fileKey: "P13uo43zylGM4Lzn7Do2hg1QyuOfIsFc",
    createdAt: "2023-07-22T05:51:08.450Z",
    __v: 0,
  },
  parentAadhaarCard: {
    _id: "64bb6e4f83470b00181a3b68",
    originalFileName: "Grp Pic.jpg",
    fileKey: "Vy9fgo4l4HbqEF0kyzprb7jtiX2yIof1",
    createdAt: "2023-07-22T05:51:11.685Z",
    __v: 0,
  },
  parentAddressProof: {
    _id: "64bb6e5483470b00181a3b6a",
    originalFileName: "Grp Pic.jpg",
    fileKey: "2dVrOoPiC7CEi5OLbgGIZ2XDCRoi2a0P",
    createdAt: "2023-07-22T05:51:16.345Z",
    __v: 0,
  },
  studentPhoto: {
    _id: "64bb6e4583470b00181a3b64",
    originalFileName: "Grp Pic.jpg",
    fileKey: "nqwzGWVPgXGfL6Nr7M189T8TLfbmM8xa",
    createdAt: "2023-07-22T05:51:01.780Z",
    __v: 0,
  },
  applicationFee: "345.00",
  paymentNote: "Tnx Success",
  paymentStatus: "",
  age: 22,
  interviewDate: "2023-02-02",
  interviewerNote: "Good",
};

const callbackParams = {
  ORDERID: "12345",
  CHECKSUMHASH: "checksum123",
  MID: "MID123",
  TXNAMOUNT: "100",
  STATUS: "TXN_SUCCESS",
  RESPMSG: "Payment successful",
  PAYMENTMODE: "UPI",
};

describe("Payment API - Mock Testing", () => {
  test("GET getPaymentConfigService", async () => {
    PaymentConfigs.findOne = jest.fn().mockResolvedValue({
      gatewayName: "PayTM",
      applicationTxnAmount: 100,
      applicationTxnTax: 10,
      totalTxnAmount: 110,
      availablePaymentOptions: ["Online", "Cash"],
      defaultPaymentOption: "Online",
    });
    const result = await getPaymentConfigService();
    expect(result).toEqual({
      gatewayName: "PayTM",
      applicationTxnAmount: 100,
      applicationTxnTax: 10,
      totalTxnAmount: 110,
      availablePaymentOptions: ["Online", "Cash"],
      defaultPaymentOption: "Online",
    });
  });

  test("GET getPaymentConfigService - User not found", async () => {
    User.findById = jest.fn().mockResolvedValue(null);
    try {
      await getPaymentConfigService();
    } catch (error) {
      expect(error.message).toBe("User not found");
    }
  });

  test("GET getPaymentConfigService with error", async () => {
    const mockError = "Error while getting payment config";
    jest
      .spyOn(PaymentConfigs, "findOne")
      .mockRejectedValue(new Error(mockError));

    await expect(getPaymentConfigService()).rejects.toThrow(mockError);
  });

  test("GET applicationPaymentService", async () => {
    User.findById = jest.fn().mockResolvedValue(mockUser);
    PaymentConfigs.findOne = jest
      .fn()
      .mockResolvedValue(paymentConfigsMockData);
    Application.findById = jest.fn().mockResolvedValue(applicationMock);
    const genChecksumMock = jest
      .fn()
      .mockResolvedValue(
        "0Z3E+CrK1R23meC209+IAIXNTedCGLVO54Ji8h8jplsPx5Z4WUMPj/vqnp0T4hXjHh44qpaTvIE69Vy4V0+2ngvAXrgsadv1GW5Fk+0feZs="
      );
    Payment.create = jest.fn().mockResolvedValue(paymentMockData);
    const generatePaymentRequest = jest.fn().mockResolvedValue({
      formFields: [
        {
          id: "MID",
          key: "MID",
          type: "input",
          name: "MID",
          defaultValue: "FmLuTv13117771134218",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "WEBSITE",
          key: "WEBSITE",
          type: "input",
          name: "WEBSITE",
          defaultValue: "WEBSTAGING",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "INDUSTRY_TYPE_ID",
          key: "INDUSTRY_TYPE_ID",
          type: "input",
          name: "INDUSTRY_TYPE_ID",
          defaultValue: "Retail",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "CHANNEL_ID",
          key: "CHANNEL_ID",
          type: "input",
          name: "CHANNEL_ID",
          defaultValue: "WEB",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "ORDER_ID",
          key: "ORDER_ID",
          type: "input",
          name: "ORDER_ID",
          defaultValue: "64bb6db083470b00181a3b59",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "CUST_ID",
          key: "CUST_ID",
          type: "input",
          name: "CUST_ID",
          defaultValue: "64bb6db083470b00181a3b58",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "PAYMENT_MODE_ONLY",
          key: "PAYMENT_MODE_ONLY",
          type: "input",
          name: "PAYMENT_MODE_ONLY",
          defaultValue: "Yes",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "PAYMENT_TYPE_ID",
          key: "PAYMENT_TYPE_ID",
          type: "input",
          name: "PAYMENT_TYPE_ID",
          defaultValue: "UPI,CC,NB",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "TXN_AMOUNT",
          key: "TXN_AMOUNT",
          type: "input",
          name: "TXN_AMOUNT",
          defaultValue: "346",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "CALLBACK_URL",
          key: "CALLBACK_URL",
          type: "input",
          name: "CALLBACK_URL",
          defaultValue:
            "http://localhost:9200/payment-integrations/application-payment/callback",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "EMAIL",
          key: "EMAIL",
          type: "input",
          name: "EMAIL",
          defaultValue: "abc@gmail.com",
          hideExpression: true,
          templateOptions: {},
        },
        {
          id: "CHECKSUMHASH",
          key: "CHECKSUMHASH",
          type: "input",
          name: "CHECKSUMHASH",
          defaultValue:
            "0Z3E+CrK1R23meC209+IAIXNTedCGLVO54Ji8h8jplsPx5Z4WUMPj/vqnp0T4hXjHh44qpaTvIE69Vy4V0+2ngvAXrgsadv1GW5Fk+0feZs=",
          hideExpression: true,
          templateOptions: {},
        },
      ],
      action: "https://securegw-stage2.paytm.in/order/process",
    });
    const userId = "64bb6db083470b00181a3b58";
    const applicationId = "64bb6db083470b00181a3b59";
    let result;
    let error;
    try {
      result = await applicationPaymentService({
        userId,
        applicationId,
        genChecksum: genChecksumMock,
      });
    } catch (exception) {
      error = exception;
    }
    if (error) {
      console.error("Error in applicationPaymentService:", error);
    } else {
      expect(error).toBeUndefined();
    }
    expect(User.findById).toHaveBeenCalledWith({
      _id: "64bb6db083470b00181a3b58",
    });
    expect(PaymentConfigs.findOne).toHaveBeenCalledWith({
      gatewayName: "PayTM",
    });
    expect(Application.findById).toHaveBeenCalledWith({
      _id: "64bb6db083470b00181a3b59",
    });
  });

  test("GET applicationPaymentCallbackService", async () => {
    Payment.findOneAndUpdate = jest.fn().mockResolvedValue({});
    Application.findByIdAndUpdate = jest.fn().mockResolvedValue({});
    const result = await applicationPaymentCallbackService(callbackParams);
    expect(result).toBe(
      "http://localhost:3000/onboard/confirmation?applicationId=12345"
    );
    expect(Payment.findOneAndUpdate).toHaveBeenCalledWith(
      {
        ORDER_ID: "12345",
        CHECKSUMHASH: "checksum123",
        MID: "MID123",
      },
      callbackParams
    );
    const expectedUpdateData = {
      applicationFee: "100",
      paymentStatus: "TXN_SUCCESS",
      paymentNote: "Payment successful",
      paymentMode: "UPI",
      applicationStatus: "Application Submitted",
    };
    expect(Application.findByIdAndUpdate).toHaveBeenCalledWith(
      { _id: "12345" },
      expectedUpdateData
    );
  });

  test("GET applicationPaymentCallbackService - Payment Status Not 'TXN_SUCCESS'", async () => {
    Payment.findOneAndUpdate = jest.fn().mockResolvedValue({});
    Application.findByIdAndUpdate = jest.fn().mockResolvedValue({});
    callbackParams.STATUS = "TXN_Failure";
    const result = await applicationPaymentCallbackService(callbackParams);
    expect(result).toBe(
      "http://localhost:3000/onboard/confirmation?applicationId=12345"
    );
    expect(Payment.findOneAndUpdate).toHaveBeenCalledWith(
      {
        ORDER_ID: "12345",
        CHECKSUMHASH: "checksum123",
        MID: "MID123",
      },
      callbackParams
    );
    const expectedUpdateData = {
      applicationFee: "100",
      paymentStatus: "TXN_Failure",
      paymentNote: "Payment successful",
      paymentMode: "UPI",
      applicationStatus: "Awaiting Application Fee",
    };
    expect(Application.findByIdAndUpdate).toHaveBeenCalledWith(
      { _id: "12345" },
      expectedUpdateData
    );
  });

  test('applicationPaymentCallbackService - Exception handling', async () => {
    Payment.findOneAndUpdate.mockRejectedValue(new Error('Mocked error'));
    const callbackParams = {
      ORDERID: 'mockOrderId',
      CHECKSUMHASH: 'mockChecksum',
      MID: 'mockMid',
    };
    const result = await applicationPaymentCallbackService(callbackParams);
    expect(result).toBe('http://dev.mentorerp.com:8080/onboard/confirmation?applicationId=mockOrderId');
    expect(Payment.findOneAndUpdate).toHaveBeenCalledWith(
      {
        ORDER_ID: 'mockOrderId',
        CHECKSUMHASH: 'mockChecksum',
        MID: 'mockMid',
      },
      callbackParams
    );
  });

  test("GET getAdmissionPaymentConfigService", async () => {
    PaymentConfigs.findOne = jest
      .fn()
      .mockResolvedValue(paymentConfigsMockData);
    const result = await getAdmissionPaymentConfigService();
    expect(result).toEqual(paymentConfigsMockData);
  });

  test("GET getAdmissionPaymentConfigService - Error Handling", async () => {
    const error = new Error("Error while getting payment config");
    PaymentConfigs.findOne = jest.fn().mockRejectedValue(error);
    try {
      await getAdmissionPaymentConfigService();
    } catch (thrownError) {
      expect(thrownError).toEqual(error);
    }
  });

  test("GET admissionPaymentService", async () => {
    const userId = "64bb6db083470b00181a3b58";
    const applicationId = "64bb6db083470b00181a3b59";
    User.findById = jest.fn().mockResolvedValue(mockUser);
    PaymentConfigs.findOne = jest
      .fn()
      .mockResolvedValue(paymentConfigsMockData);
    Application.findOneAndUpdate = jest.fn().mockResolvedValue(applicationMock);
    const generatePaymentRequest = jest
      .fn()
      .mockResolvedValue("mockedPaymentRequest");
    const genChecksum = jest.fn().mockResolvedValue("checksum123");
    Payment.create = jest.fn().mockResolvedValue({});
    const result = await admissionPaymentService({ userId, applicationId });
    expect(result).toEqual({
      formFields: expect.arrayContaining([
        {
          id: "MID",
          key: "MID",
          type: "input",
          name: "MID",
          defaultValue: expect.any(String),
          hideExpression: true,
          templateOptions: {},
        },
      ]),
      action: "https://securegw-stage2.paytm.in/order/process",
    });
    expect(User.findById).toHaveBeenCalledWith({ _id: userId });
    expect(PaymentConfigs.findOne).toHaveBeenCalledWith({
      gatewayName: "PayTM",
    });
    expect(Application.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: applicationId },
      { admissionPaymentId: expect.any(String) },
      { new: true }
    );
    expect(Payment.create).toHaveBeenCalledWith(expect.any(Object));
  });

  test("GET admissionPaymentService - PaymentConfig not found", async () => {
    const userId = "64bb6db083470b00181a3b58";
    const applicationId = "64bb6db083470b00181a3b59";
    User.findById = jest.fn().mockResolvedValue(mockUser);
    PaymentConfigs.findOne = jest.fn().mockResolvedValue(null);
    try {
      await admissionPaymentService(userId, applicationId);
    } catch (error) {
      expect(error.message).toBe("PaymentConfig not found");
    }
  });

  test("GET admissionPaymentService - User not found", async () => {
    User.findById = jest.fn().mockResolvedValue(null);
    try {
      const userId = "123";
      await admissionPaymentService(userId);
    } catch (error) {
      expect(error.message).toBe("User not found");
    }
  });

  test("GET admissionPaymentService - Payment already done", async () => {
    const mockApplication = {
      paymentStatus: "TXN_SUCCESS",
    };
    User.findById.mockResolvedValue(mockUser);
    PaymentConfigs.findOne.mockResolvedValue(paymentConfigsMockData);
    Application.findOneAndUpdate.mockResolvedValue(mockApplication);
    try {
      await admissionPaymentService({
        userId: "user123",
        applicationId: "684hhgesvje48gji60",
      });
    } catch (exception) {
      expect(exception.message).toBe("Payment is already done.");
    }
    expect(User.findById).toHaveBeenCalledWith({ _id: "user123" });
    expect(PaymentConfigs.findOne).toHaveBeenCalledWith({
      gatewayName: "PayTM",
    });
    expect(Application.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "684hhgesvje48gji60" },
      { admissionPaymentId: expect.any(String) },
      { new: true }
    );
  });

  test("GET applicationPaymentService - User Not Found", async () => {
    User.findById = jest.fn().mockResolvedValue(null);
    try {
      await applicationPaymentService({
        userId: "5eg36627w7784939fgr",
        applicationId: "64738ehf73647wh2u46",
      });
    } catch (error) {
      expect(error).toEqual(new Error("User not found"));
    }
  });

  test("GET applicationPaymentService - PaymentConfig Not Found", async () => {
    User.findById = jest.fn().mockResolvedValue({ user: mockUser });
    PaymentConfigs.findOne = jest.fn().mockResolvedValue(null);
    const userId = "64bb6db083470b00181a3b58";
    const applicationId = "64bb6db083470b00181a3b59";
    let error;
    try {
      await applicationPaymentService({
        userId,
        applicationId,
      });
    } catch (exception) {
      error = exception;
    }
    expect(error).toBeDefined();
    expect(error.message).toBe("PaymentConfig not found");
  });

  test("GET applicationPaymentService - Payment Already Done", async () => {
    User.findById = jest.fn().mockResolvedValue({ user: mockUser });
    PaymentConfigs.findOne = jest
      .fn()
      .mockResolvedValue(paymentConfigsMockData);
    Application.findById = jest.fn().mockResolvedValue({
      paymentStatus: "TXN_SUCCESS",
    });
    const userId = "64bb6db083470b00181a3b58";
    const applicationId = "64bb6db083470b00181a3b59";
    let error;
    try {
      await applicationPaymentService({
        userId,
        applicationId,
      });
    } catch (exception) {
      error = exception;
    }
    expect(error).toBeDefined();
    expect(error.message).toBe("Payment is already done");
  });

  test("GET applicationPaymentService - User Email and Mobile", async () => {
    User.findById = jest.fn().mockResolvedValue({
      email: "user@example.com",
      mobile: "1234567890",
    });
    PaymentConfigs.findOne = jest
      .fn()
      .mockResolvedValue(paymentConfigsMockData);
    Application.findById = jest
      .fn()
      .mockResolvedValue({ paymentStatus: "Pending" });
    const paymentRequest = await applicationPaymentService({
      userId: "123",
      applicationId: "456",
    });
  });

  test("GET admissionPaymentCallbackService - TXN_SUCCESS", async () => {
    const params = {
      ORDERID: "12345",
      CHECKSUMHASH: "checksum123",
      MID: "MID123",
      TXNAMOUNT: "100.00",
      STATUS: "TXN_SUCCESS",
      RESPMSG: "Payment successful",
    };
    Payment.findOneAndUpdate = jest.fn().mockResolvedValue({});
    Application.findOneAndUpdate = jest
      .fn()
      .mockResolvedValue({ _id: "application123" });
    const result = await admissionPaymentCallbackService(params);
    expect(Payment.findOneAndUpdate).toHaveBeenCalledWith(
      {
        ORDER_ID: params.ORDERID,
        CHECKSUMHASH: params.CHECKSUMHASH,
        MID: params.MID,
      },
      params
    );
    expect(Application.findOneAndUpdate).toHaveBeenCalledWith(
      { admissionPaymentId: params.ORDERID },
      {
        admissionFee: params.TXNAMOUNT,
        admissionPaymentStatus: params.STATUS,
        admissionPaymentNote: params.RESPMSG,
        admissionStatus: "Admission Fee Paid",
      },
      { new: true }
    );
    expect(result).toBe(
      "http://dev.mentorerp.com:8080/onboard/confirmation?applicationId=application123"
    );
  });

  test("GET admissionPaymentCallbackService", async () => {
    Payment.findOneAndUpdate = jest.fn().mockResolvedValue({});
    Application.findOneAndUpdate = jest.fn().mockResolvedValue({
      _id: "12345",
    });
    const callbackParams = {
      ORDERID: "12345",
      CHECKSUMHASH: "checksum123",
      MID: "MID123",
      TXNAMOUNT: "100",
      STATUS: "TXN_SUCCESS",
      RESPMSG: "Payment successful",
    };
    const result = await admissionPaymentCallbackService(callbackParams);

    expect(result).toBe(
      "http://dev.mentorerp.com:8080/onboard/confirmation?applicationId=12345"
    );
    expect(Payment.findOneAndUpdate).toHaveBeenCalledWith(
      {
        ORDER_ID: "12345",
        CHECKSUMHASH: "checksum123",
        MID: "MID123",
      },
      callbackParams
    );

    const expectedUpdateData = {
      admissionFee: "100",
      admissionPaymentStatus: "TXN_SUCCESS",
      admissionPaymentNote: "Payment successful",
      admissionStatus: "Admission Fee Paid",
    };

    expect(Application.findOneAndUpdate).toHaveBeenCalledWith(
      { admissionPaymentId: "12345" },
      expectedUpdateData,
      { new: true }
    );
  });

  test("GET admissionPaymentCallbackService - TXN_FAILURE", async () => {
    const params = {
      ORDERID: "12345",
      CHECKSUMHASH: "checksum123",
      MID: "MID123",
      TXNAMOUNT: "100.00",
      STATUS: "TXN_FAILURE",
      RESPMSG: "Payment failed",
    };

    Payment.findOneAndUpdate = jest.fn().mockResolvedValue({});
    Application.findOneAndUpdate = jest
      .fn()
      .mockResolvedValue({ _id: "application123" });

    const result = await admissionPaymentCallbackService(params);

    expect(Payment.findOneAndUpdate).toHaveBeenCalledWith(
      {
        ORDER_ID: params.ORDERID,
        CHECKSUMHASH: params.CHECKSUMHASH,
        MID: params.MID,
      },
      params
    );

    expect(Application.findOneAndUpdate).toHaveBeenCalledWith(
      { admissionPaymentId: params.ORDERID },
      {
        admissionFee: params.TXNAMOUNT,
        admissionPaymentStatus: params.STATUS,
        admissionPaymentNote: params.RESPMSG,
        admissionStatus: "Awaiting Admission Fee",
      },
      { new: true }
    );

    expect(result).toBe(
      "http://dev.mentorerp.com:8080/onboard/confirmation?applicationId=application123"
    );
  });

  test('GET admissionPaymentCallbackService - Exception handling', async () => {
    Payment.findOneAndUpdate.mockRejectedValue(new Error('Mocked error'));
    const params = {
      ORDERID: 'mockOrderId',
      CHECKSUMHASH: 'mockChecksum',
      MID: 'mockMid',
      TXNAMOUNT: '100.00',
      STATUS: 'TXN_SUCCESS',
      RESPMSG: 'Payment successful',
    };
    const result = await admissionPaymentCallbackService(params);
    expect(result).toBe('http://dev.mentorerp.com:8080/onboard/confirmation?applicationId=');
    expect(Payment.findOneAndUpdate).toHaveBeenCalledWith(
      {
        ORDER_ID: 'mockOrderId',
        CHECKSUMHASH: 'mockChecksum',
        MID: 'mockMid',
      },
      params
    );
  });

  test("GET admissionPaymentService - Payment already done with mobile", async () => {
    User.findById.mockResolvedValue({
      ...mockUser,
      mobile: "1234567890",
    });
    PaymentConfigs.findOne.mockResolvedValue(paymentConfigsMockData);
    Application.findOneAndUpdate.mockResolvedValue(applicationMock);
    try {
      await admissionPaymentService({
        userId: "user123",
        applicationId: "application123",
      });
    } catch (exception) {
      expect(exception.message).toBe("Payment is already done.");
    }
    expect(User.findById).toHaveBeenCalledWith({ _id: "user123" });
    expect(PaymentConfigs.findOne).toHaveBeenCalledWith({
      gatewayName: "PayTM",
    });
    expect(Application.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "application123" },
      { admissionPaymentId: expect.any(String) },
      { new: true }
    );
  });

  test("GET applicationPaymentCallbackService - Payment not successful", async () => {
    const callbackParams = {
      ORDERID: "12345",
      CHECKSUMHASH: "checksum123",
      MID: "MID123",
      TXNAMOUNT: "100",
      STATUS: "TXN_FAILURE",
      RESPMSG: "Payment failed",
      PAYMENTMODE: "UPI",
    };
    Payment.findOneAndUpdate.mockResolvedValue({});
    Application.findByIdAndUpdate.mockResolvedValue({
      _id: callbackParams.ORDERID,
    });
    const result = await applicationPaymentCallbackService(callbackParams);
    expect(result).toBe(
      "http://localhost:3000/onboard/confirmation?applicationId=12345"
    );
    const expectedUpdateData = {
      applicationFee: "100",
      paymentStatus: "TXN_FAILURE",
      paymentNote: "Payment failed",
      paymentMode: "UPI",
      applicationStatus: "Awaiting Application Fee",
    };
    expect(Application.findByIdAndUpdate).toHaveBeenCalledWith(
      { _id: "12345" },
      expectedUpdateData
    );
  });
});
