import { Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Store API',
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/**/*.ts', './src/schema/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default class SwaggerDocs {
  public generate(app: any, port: number) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('docs.json', (_req: Request, res: Response) => {
      res.setHeader("Content-type", "application/json");
      res.send(swaggerSpec);
    });

    console.info(`Docs available at http://localhost:${port}/docs`);
  };
};