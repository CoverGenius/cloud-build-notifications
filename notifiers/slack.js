const IncomingWebhook = require('@slack/client').IncomingWebhook;
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

const statusCodes = {
  CANCELLED: {
    color: '#fbbc05',
    text: 'Build cancelled'
  },
  FAILURE: {
    color: '#ea4335',
    text: 'Build failed'
  },
  INTERNAL_ERROR: {
    color: '#ea4335',
    text: 'Internal error encountered during build'
  },
  QUEUED: {
    color: '#fbbc05',
    text: 'New build queued'
  },
  SUCCESS: {
    color: '#34a853',
    text: 'Build successfully completed'
  },
  TIMEOUT: {
    color: '#ea4335',
    text: 'Build timed out'
  },
  WORKING: {
    color: '#34a853',
    text: 'New build in progress'
  }
};


/**
 * Publishes message to slack channel.
 *
 * @param {Object} message Message payload.
 */
module.exports = async (build) => {
  const statusMessage = statusCodes[build.status].text;
  const branchName = build.substitutions.BRANCH_NAME;
  const commitSha = build.substitutions.SHORT_SHA;
  const repoName = build.substitutions.REPO_NAME;

  var contextBlocks = [
    {
      type: 'mrkdwn',
      text: `*Branch:* ${branchName}`
    },
    {
      type: 'mrkdwn',
      text: `*Commit:* ${commitSha}`
    }
  ];

  if (build.status == 'SUCCESS') {
    if (build.artifacts && build.artifacts.images) {
      contextBlocks.push({
        type: 'mrkdwn',
        text: `*Container:* ${build.artifacts.images.join(', ')}`
      })
    }
  }

  const msg = {
    text: `${statusMessage} for *${build.projectId}*.`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${statusMessage} for *${build.projectId}*.`
        }
      }
    ],
    attachments: [
      {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Build Log:* <${build.logUrl}|${repoName}>`
            }
          },
          {
            type: 'context',
            elements: contextBlocks
          }
        ],
        color: statusCodes[build.status].color
      }
    ]
  };

  await webhook.send(msg);
};
