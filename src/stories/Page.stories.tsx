import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import * as HeaderStories from "./Header.stories";
import { Page, PageProps } from "./Page";

export default {
  title: "Example/Page",
  component: Page,
} as Meta;

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
