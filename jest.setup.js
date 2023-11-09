/* eslint-disable no-undef */

jest.mock('next/navigation', () => {
  return {
    useRouter: () => {
      return {
        push: () => {},
      };
    },
  };
});
