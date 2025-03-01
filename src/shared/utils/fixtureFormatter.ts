import config from '../../config';

import { ConfigEnvDto } from './configEnvDto';

const nodeEnv = config.node_env;

export const fixtureFormatter = (fixtures: ConfigEnvDto): any => fixtures[nodeEnv as keyof ConfigEnvDto];
