import { GenericFileUpload } from "./model";
import { doDownloadService, doUploadService } from "./service";
const { Readable } = require("stream");
const AWS = require("aws-sdk");

jest.mock("./model", () => ({
  GenericFileUpload: {
    find: jest.fn(),
    create: jest.fn(),
  },
}));

const uploadMock = jest.fn((params, callback) => {
  callback(null, { Location: "file-location" });
});
AWS.S3.prototype.upload = uploadMock;

GenericFileUpload.create = jest.fn().mockResolvedValue({
  originalFileName: "example.txt",
  fileKey: "unique-file-key",
  createdAt: new Date(),
});

describe("Docment API - Mock testing ", () => {
  test("POST doUploadService", async () => {
    GenericFileUpload.create = jest.fn().mockResolvedValue({
      originalFileName: "example.txt",
      fileKey: "unique-file-key",
      createdAt: new Date(),
    });
    const uploadMock = jest.fn((params, callback) => {
      callback(null, { Location: "file-location" });
    });
    AWS.S3.prototype.upload = uploadMock;
    const req = {
      file: {
        originalname: "example.txt",
        buffer: Buffer.from("file content"),
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    await doUploadService(req, res);
    expect(GenericFileUpload.create).toHaveBeenCalledWith({
      originalFileName: "example.txt",
    });
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        originalFileName: "example.txt",
        fileKey: "unique-file-key",
        createdAt: expect.any(Date),
      })
    );
    expect(uploadMock).toHaveBeenCalledWith(
      {
        Bucket: "applicationattachment2",
        Key: "unique-file-key",
        Body: Buffer.from("file content"),
      },
      expect.any(Function)
    );
  });

  test("POST doUploadService - Error during S3 upload", async () => {
    GenericFileUpload.create = jest.fn().mockResolvedValue({
      originalFileName: "example.txt",
      fileKey: "unique-file-key",
      createdAt: new Date(),
    });
    AWS.S3.prototype.upload = jest.fn((params, callback) => {
      callback(new Error("S3 upload failed"), null);
    });
    const req = {
      file: {
        originalname: "example.txt",
        buffer: Buffer.from("file content"),
      },
    };
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockImplementation(() => ({ json: jsonMock }));
    const res = {
      status: statusMock,
      json: jsonMock,
    };
    await doUploadService(req, res);
    expect(GenericFileUpload.create).toHaveBeenCalledWith({
      originalFileName: "example.txt",
    });
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Error during S3 upload" });
  });

  test("POST doUploadService - GenericFileUpload.create Failure", async () => {
    GenericFileUpload.create = jest
      .fn()
      .mockRejectedValue(new Error("Database Error"));
    const uploadMock = jest.fn((params, callback) => {
      callback(null, { Location: "file-location" });
    });
    AWS.S3.prototype.upload = uploadMock;
    const req = {
      file: {
        originalname: "example.txt",
        buffer: Buffer.from("file content"),
      },
    };
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockImplementation(() => ({ json: jsonMock }));
    const res = {
      status: statusMock,
      json: jsonMock,
    };
    await doUploadService(req, res);
    expect(GenericFileUpload.create).toHaveBeenCalledWith({
      originalFileName: "example.txt",
    });
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Error during file creation",
    });
  });

  jest.mock("aws-sdk", () => {
    const mockGetObject = jest.fn();
    return {
      S3: jest.fn(() => ({
        getObject: mockGetObject,
      })),
    };
  });

  test("GET doDownloadService Successful Download", async () => {
    const req = {
      params: {
        filekey: "test-file-key",
      },
    };
    const jsonMock = jest.fn();
    const endMock = jest.fn();
    const statusMock = jest.fn().mockImplementation(() => ({ json: jsonMock }));
    const res = {
      status: statusMock,
      json: jsonMock,
      end: endMock,
    };
    const s3Stream = {
      on: (event, callback) => {
        if (event === "error") {
          callback(new Error("Test error"));
        } else if (event === "end") {
          callback();
        }
      },
      pipe: jest.fn(),
    };
    const getObjectStub = jest.fn().mockReturnValue({
      createReadStream: jest.fn(() => s3Stream),
    });
    const AWS = require("aws-sdk");
    AWS.S3.prototype.getObject = getObjectStub;
    const s3Client = new AWS.S3();
    jest.spyOn(s3Client, "getObject").mockImplementation(getObjectStub);
    await doDownloadService(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error -> dest.on is not a function",
    });
  });

  test("GET doDownloadService S3 Client Error", async () => {
    const req = {
      params: {
        filekey: "test-file-key",
      },
    };
    const jsonMock = jest.fn();
    const endMock = jest.fn();
    const onMonck = jest.fn();
    const statusMock = jest.fn().mockImplementation(() => ({ json: jsonMock }));
    const res = {
      status: statusMock,
      json: jsonMock,
      end: endMock,
      on: jest.fn(),
      once: jest.fn(),
      emit: jest.fn(),
    };
    const s3Stream = {
      on: jest.fn(),
      pipe: jest.fn(),
    };
    const getObjectStub = jest.fn().mockReturnValue({
      createReadStream: jest.fn(() => s3Stream),
    });
    const s3Client = new AWS.S3();
    jest.spyOn(s3Client, "getObject").mockImplementation(() => {
      throw new Error("S3 Client Error");
    });
    await doDownloadService(req, res);
  });
});
