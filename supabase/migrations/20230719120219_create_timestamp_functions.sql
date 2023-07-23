CREATE OR REPLACE FUNCTION epoch_to_timestamp(epoch TEXT) RETURNS TIMESTAMP WITH TIME ZONE AS $$ BEGIN RETURN TIMESTAMP WITH TIME ZONE 'epoch' + ((epoch::BIGINT) / 1000) * INTERVAL '1 second';
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION timestamp_to_epoch(ts TIMESTAMP WITH TIME ZONE) RETURNS BIGINT AS $$ BEGIN RETURN (
        EXTRACT(
            EPOCH
            FROM ts
        ) * 1000
    )::BIGINT;
END;
$$ LANGUAGE plpgsql;