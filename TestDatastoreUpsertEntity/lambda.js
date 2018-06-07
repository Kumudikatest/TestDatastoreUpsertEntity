let AWS = require('aws-sdk');
let _auth = require('./Authorizer');
let google = require('googleapis').google;
const datastore = google.datastore('v1');
exports.handler = function (event, context, callback) {
	datastore.projects.beginTransaction({
		projectId: process.env.GCLOUD_PROJECT_ID,
		resource: {
			transactionOptions: {
				readWrite: {}
			}
		}
	}).then(response => {
		datastore.projects.commit({
			projectId: process.env.GCLOUD_PROJECT_ID,
			resource: {
				mode: "TRANSACTIONAL",
				mutations: [{
					upsert: {
						key: {
							path: {
								kind: "Testing1",
								name: "Test1"
							}
						},
						properties: {
							Size: {
								integerValue: 5
							}
						}
					}
				}],
				transaction: `${response.data.transaction}`
			}
		}).then(response => {
			console.log(response.data);           // successful response
			/*
			response.data = {
				"mutationResults": [
					{
						"version": "<version-timestamp-or-id>"
					}
				],
				"indexUpdates": 8,
				"commitVersion": "<commit-timestamp>"
			}
			*/
		})
			.catch(err => {
				console.log(err, err.stack); // an error occurred
			});
	})
		.catch(err => {
			console.log(err, err.stack); // an error occurred
		});


	callback(null, 'Successfully executed');
}