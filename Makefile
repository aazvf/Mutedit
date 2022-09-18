FN=testnuxtapp
OUTPUT=output.zip

s3:
	npm run build
	npm run generate
	aws s3 sync .output/public s3://mutedit.icey.one/ --profile s3deploy --delete


build: 
	npm run build

lambda:
	NUXT_APP_CDN_URL=https://mutedit.icey.one/ NITRO_PRESET=aws-lambda npm run build

zip:
	rm $(OUTPUT)
	7z a -tzip $(OUTPUT) ./.output/*

create: zip
	aws lambda create-function \
		--profile lambda \
		--region eu-west-1 \
		--function-name $(FN) \
		--role arn:aws:iam::298421479859:role/LambdaBasicExecutionRole \
		--zip-file fileb://$(OUTPUT) \
		--handler server/index.mjs \
		--timeout 4 \
		--memory-size 128 \
		--runtime nodejs16.x

addurl:
	aws lambda create-function-url-config \
		--profile lambda \
		--region eu-west-1 \
		--function-name $(FN) \
		--qualifier prod \
		--auth-type NONE

update: zip
	aws lambda update-function-code --profile lambda --region eu-west-1 --function-name $(FN) --zip-file fileb://$(OUTPUT)

delete:
	aws lambda delete-function --profile lambda --region eu-west-1 --function-name $(FN)

clean:
	rm -rf .output
	rm -f $(OUTPUT)
