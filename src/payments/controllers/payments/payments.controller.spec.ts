import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';
import { PaymentsService } from '../../services/payments/payments.service';
import { BadRequestException } from '@nestjs/common';

// nama untuk unit testnya
describe('PaymentsController', () => {
  // controller yang akan digunakan didalam function unit testnya
  let controller: PaymentsController;
  // controller yang akan digunakan didalam function unit testnya
  let paymentService: PaymentsService;

  const sendResponseMock = {
    send: jest.fn((x) => x),
  };

  // Membuat Mock data untuk object request yg dikembalikan dari conroller
  const requestMock = {
    query: {},
  } as unknown as Request; // netralisir objek(Request) dengan melakukan type ke unknown terlebih dahulu

  // Membuat Mock data untuk object response yg dikembalikan dari conroller
  const responseMock = {
    status: jest.fn((x) => sendResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentService = module.get<PaymentsService>('PAYMENTS_SERVICE');
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('sevice should be defined', () => {
    expect(paymentService).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a stattus of 400', async () => {
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(sendResponseMock.send).toHaveBeenCalledWith({
        msg: 'Missing count or page query parameter',
      });
    });

    it('should return a status of 200 when query params are present', async () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });

  describe('CreatePayment', () => {
    it('should throw an error', async () => {
      jest.spyOn(paymentService, 'createPayment').mockImplementationOnce(() => {
        throw new BadRequestException();
      });
      try {
        const response = await controller.createPayment({
          email: 'example1@gmail.com',
          price: 100,
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
