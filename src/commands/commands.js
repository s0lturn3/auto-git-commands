import { createBranch } from './branch.js';
import { checkoutBranch } from './checkout.js';
import { pull } from './pull.js';
import { checkoutTag } from './tag.js';

export const commands = {
  checkout: checkoutBranch,
  pull: pull,
  tag: checkoutTag,
  branch: createBranch,
};
