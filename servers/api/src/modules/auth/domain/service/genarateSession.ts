import { CacheProvider } from '../../../../infra/caching/CacheProvider.js';
import { EncriptProvider } from '../../../../infra/security/encript/encriptProvider.js';
import JwtService from '../../../../infra/security/jwt/jwtService.js';
import Session from '../entities/session.js';
import SessionRepo from '../repositories/sessionRepo.js';

export default async function generateSession(props: {
  session: {
    userId: string;
    isAdmin: boolean;
    userDeviceId: string;
  };
  encriptProvider: EncriptProvider;
  chacheProvider: CacheProvider;
  jwtService: JwtService;
  repo: SessionRepo;
}) {
  const {
    chacheProvider,
    encriptProvider,
    session: sessionProps,
    jwtService,
    repo,
  } = props;

  const refreshToken = Session.generateRefreshToken();
  const refreshHash = encriptProvider.hash(refreshToken);

  const session = new Session({
    id: crypto.randomUUID(),
    userId: sessionProps.userId,
    userDeviceId: sessionProps.userDeviceId,
    isActive: true,
    refreshHash,
    expiresAt: Session.getExpirationTime(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await repo.save(session);
  const token = jwtService.generate({
    sessionId: session.getId(),
    sub: session.userId,
    isAdmin: sessionProps.isAdmin,
  });

  try {
    chacheProvider.add(
      {
        expiresAt: session.expiresAt,
        isActive: true,
      },
      `session.${session.getId()}`,
    );
  } catch (error) {}

  return {
    session,
    token,
    refreshToken,
  };
}
