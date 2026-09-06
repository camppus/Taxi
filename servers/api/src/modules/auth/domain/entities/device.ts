import Enttiy from '../../../../shared/entities/entitiy.js';

export interface DeviceProps {
  id: string;
  deviceKey: string;

  platform: string;
  platformVersion?: string;

  deviceType?: string;
  deviceModel?: string;
  manufacturer?: string;

  appVersion?: string;

  browser?: string;
  browserVersion?: string;

  userAgent?: string;

  ipAddress?: string;
  country?: string;
  city?: string;

  createdAt: Date;
  updatedAt: Date;
}

export default class Device extends Enttiy {
  constructor(private readonly props: DeviceProps) {
    super(props.id, props.createdAt);
  }

  get deviceKey(): string {
    return this.props.deviceKey;
  }

  get platform(): string {
    return this.props.platform;
  }

  get platformVersion(): string | undefined {
    return this.props.platformVersion;
  }

  get deviceType(): string | undefined {
    return this.props.deviceType;
  }

  get deviceModel(): string | undefined {
    return this.props.deviceModel;
  }

  get manufacturer(): string | undefined {
    return this.props.manufacturer;
  }

  get appVersion(): string | undefined {
    return this.props.appVersion;
  }

  get browser(): string | undefined {
    return this.props.browser;
  }

  get browserVersion(): string | undefined {
    return this.props.browserVersion;
  }

  get userAgent(): string | undefined {
    return this.props.userAgent;
  }

  get ipAddress(): string | undefined {
    return this.props.ipAddress;
  }

  get country(): string | undefined {
    return this.props.country;
  }

  get city(): string | undefined {
    return this.props.city;
  }

  update(params: {
    ipAddress?: string;
    country?: string;
    city?: string;
    appVersion?: string;
    platformVersion?: string;
    browser?: string;
    browserVersion?: string;
    userAgent?: string;
  }) {
    this.props.ipAddress = params.ipAddress;
    this.props.country = params.country;
    this.props.city = params.city;
    this.props.appVersion = params.appVersion;
    this.props.platformVersion = params.platformVersion;
    this.props.browser = params.browser;
    this.props.browserVersion = params.browserVersion;
    this.props.userAgent = params.userAgent;
    this.touch();
  }
}
