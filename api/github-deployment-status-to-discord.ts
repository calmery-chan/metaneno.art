import { EventPayloads } from "@octokit/webhooks";
import * as Sentry from "@sentry/node";
import axios from "axios";
import { NowRequest, NowResponse } from "@vercel/node";

if (process.env.NODE_ENV === "production") {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  response.statusCode = 200;

  if (!request.body.deployment_status) {
    return response.end();
  }

  const {
    deployment,
    deployment_status: deploymentStatus,
    repository,
  }: EventPayloads.WebhookPayloadDeploymentStatus = request.body;

  if (
    deploymentStatus.state === "pending" ||
    (deploymentStatus.environment !== "Production" &&
      deploymentStatus.environment !== "creamsoda-in-a-dream")
  ) {
    return response.end();
  }

  await axios.post(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.GITHUB_DEPLOYMENT_STATUS_TO_DISCORD_WEBHOOK_URL!,
    {
      embeds: [
        {
          author: {
            icon_url: deploymentStatus.creator.avatar_url,
            name: deploymentStatus.creator.login,
            url: deploymentStatus.creator.html_url,
          },
          color: deploymentStatus.state === "success" ? 65280 : 16711680,
          description: deploymentStatus.description,
          fields: [
            {
              name: "Commit SHA",
              value: deployment.sha,
            },
            {
              name: "Repository",
              value: repository.full_name,
            },
          ],
          footer: {
            icon_url: repository.owner.avatar_url,
            text: repository.owner.login,
          },
          timestamp: new Date(deploymentStatus.created_at).toISOString(),
          title: deploymentStatus.environment,
          url: deploymentStatus.target_url,
        },
      ],
    }
  );

  response.statusCode = 200;
  response.end();
};
