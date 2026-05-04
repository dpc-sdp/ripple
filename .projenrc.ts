import { javascript } from "projen";
import { SdpMonorepo } from "@dpc-sdp/ripple-sdp-projen-config";
const project = new SdpMonorepo({
  debug: false,
  defaultReleaseBranch: "main",
  devDeps: ["@dpc-sdp/ripple-sdp-projen-config@alpha"],
  name: "ripple",
  packageManager: javascript.NodePackageManager.PNPM,
  projenrcTs: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();