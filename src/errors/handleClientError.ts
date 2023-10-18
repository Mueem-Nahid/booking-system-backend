import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: IGenericErrorMessage[] = [];
  let message = '';
  const statusCode = 400;

  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Record not found!';
    errors = [
      {
        path: '',
        message,
      },
    ];
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      message = 'Delete failed';
      errors = [
        {
          path: '',
          message,
        },
      ];
    }
  } else if (error.code === 'P2002') {
    const constraintMatch = error.message.match(
      /Unique constraint failed on the (.+)/
    );
    if (constraintMatch) {
      const constraint = constraintMatch[1]; // Extract the constraint name
      message = `Email already exists.`;
      errors = [
        {
          path: '',
          message: `Unique constraint '${constraint}' failed`,
        },
      ];
    }
  }

  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleClientError;
