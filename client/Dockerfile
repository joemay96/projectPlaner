FROM oven/bun:1 as base
ENV WORKDIR /usr/src/app
WORKDIR $WORKDIR 

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
# generates files in ./output/server/index.mjs
RUN bun run build
# When generating files you need to serve the files behind a reverse proxy like nginx
#* RUN bun run generate

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
#* COPY --from=prerelease /usr/src/app/index.ts .
#* COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/ .
RUN cd ./output/server

# run the app
# USER bun
# EXPOSE 3000/tcp
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "index.mjs" ]