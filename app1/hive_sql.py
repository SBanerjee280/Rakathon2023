from sqlalchemy.engine import create_engine

HIVE_URL = 'hive://ahivehs4001.prod.hnd1.bdd.local:10000'


def execute_sql(sql_query: str):
    connect_args = {'auth': 'KERBEROS', 'kerberos_service_name': 'hive'}
    engine = create_engine(HIVE_URL, connect_args=connect_args)
    conn = engine.connect()
    result = conn.execute(sql_query)
    data = result.fetchall()
    conn.close()
    return data
